import { useState, useEffect } from "react";
import { ContentBlock } from "./Utils";
import axios from "axios";
import { backEndUrl } from "../configs";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Form } from "react-bootstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import moment from 'moment';
import { Steps, Button } from 'antd';
import { useParams } from "react-router-dom";

const stateFlow = {
  'OS':[0,'주문 등록'],
  'CS':[1,'요리 시작'],
  'CE':[2,'요리 완료'],
  'DS':[3,'배달 시작'],
  'DE':[4,'배달 완료']
};

const stateWholeIdx = 0;

const stateCheckArrays = [['OS','CS','CE','DS','DE'],
                          ['OS','CS','CE','DS'],
                          ['DE']];

const items = Object.entries(stateFlow).map((state,i)=>{
  return {
    title: state[1][1]
  }}
);

const Working = () => {
  let { stateType } = useParams();
  const stateCheckArray = stateCheckArrays[useParams().stateType];
  const [orders,setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async() => {
    setOrders([]);
    // loading 상태를 true 로 바꿉니다.
    setLoading(true);
    await axios.get(
      backEndUrl+'/order'
    )
    .then((res)=>{
      setOrders(res.data.filter((order)=>
        stateCheckArray.includes(order.state)
      ));
    }).catch((error)=>{
      console.log(error)
      setError(error);
    })
    setLoading(false);
  }

  useEffect(()=>{  
    fetchOrders();
  },[stateType]);

  const handleChange = async (id, val) => {
    const value = stateCheckArrays[stateWholeIdx][val];
    const findIndex = orders.findIndex(element => element.orderNum === Number(id));
    const order = orders[findIndex];
    Swal.fire({
      title: '주문 상태를 변경하겠습니까?',
      text : "상태는 변경하면 돌이킬 수 없습니다",
      icon: 'warning',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      showCancelButton: true
    }).then(async(res) => {
      if (res.isConfirmed) {
        let deliveredTime = null;
        switch(value){
          case 'CS':
            let fcs = {}
            for(let orderDinner of order.orderDinners){
              for(let foodCount of orderDinner.foodCounts){
                if(!fcs[foodCount.foodName]){
                  fcs[foodCount.foodName] = {
                    stock : foodCount.food.stock,
                    count : 0
                  }
                }
                fcs[foodCount.foodName].count += foodCount.count;
              }
            }
            for(let fc of Object.entries(fcs)){
              if(fc[1].stock - fc[1].count < 0){
                const res = await Swal.fire({
                  title: '재고가 부족합니다.',
                  text : '요리를 시작하겠습니까?',
                  icon: 'warning',
                  confirmButtonText: '네',
                  cancelButtonText: '아니요',
                  showCancelButton: true
                })
                if (!res.isConfirmed) return;
                break;
              };
            }
            break;
          case 'CE':
            // 요리 완료시 재고 감소
            order.orderDinners.map(async orderDinner=>
              await orderDinner.foodCounts.map((foodCount)=>{
                axios.put(
                  backEndUrl+'/food/'+foodCount.food.foodNum,{
                    "stock": foodCount.food.stock - foodCount.count,
                    "price" : foodCount.food.price
                  }
                )
              })
            )
            break;
          case 'DE':
            deliveredTime = new Date();
            break;
          default:
            break;
        } 
        await axios.put(
          backEndUrl+'/order/'+Number(id),{
            state : value,
            deliveredTime : deliveredTime
          }
        )
        Swal.fire({
          title: '상태가 변경되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        })
        fetchOrders()
      } else {
        Swal.fire({
          title: '상태 변경이 취소되었습니다.',
          confirmButtonText: '확인',
        })
      }
    })
  }
  
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!orders) return null;

  return(
    <ContentBlock margin='0 0 50px 0'>
      <Row xs={4} md={3} className="g-4">
        {orders.map(order => {
          const stateIdx = stateFlow[order.state][0]+1;
          return (
          <Col key={order.orderNum} style={order.state === 'DE' ? { opacity:0.5} : { opacity:1}}>
              <Card>
                <ContentBlock bg='rgba(161, 103, 56,1)' fw='600' color='white' padding='5px' fs='26px' text_align='center' 
                border_bottom='1px solid #adb5bd'>{order.orderNum}</ContentBlock>
                <Card.Body>
                  <ContentBlock height='235px' overflow='auto'>
                  {order.orderDinners.map((orderDinner)=>
                    <div key={orderDinner.dinner.dinnerNum}>
                      <Card.Title className="mb-4 fw-6">{orderDinner.dinner.name}</Card.Title>
                      {orderDinner.foodCounts.map((foodCount,i)=>
                        <Card.Text key={orderDinner.dinner.dinnerNum + i}>
                          {foodCount.foodName} {foodCount.count}개 {(foodCount.price*foodCount.count).toLocaleString()}원
                        </Card.Text>
                      )}
                      <Card.Text>
                        스타일 : {orderDinner.style.name} / {orderDinner.style.price.toLocaleString()}원
                      </Card.Text>
                    </div>
                  )}
                  </ContentBlock>
                  <hr></hr>
                  <Card.Text>
                    주문자 : {order.customerName}
                  </Card.Text>
                  <Card.Text>
                    주소 : {order.address}
                  </Card.Text>
                  <Card.Text>
                    주문 시간 : {moment(order.orderTime).format('MM-DD HH:mm')}
                  </Card.Text>
                  <Card.Text>
                    배달 요청 시간 : {moment(order.wantedDeliveredTime).format('MM-DD HH:mm')}
                  </Card.Text>
                  {order.state === 'DE' ? 
                  <Card.Text>
                    배달 완료 시간 : {moment(order.deliveredTime).format('MM-DD HH:mm')}
                  </Card.Text> : ''}         
                  <Form.Group className="mb-3" controlId="formBasicState">
                    <Form.Label className="mb-3">상태</Form.Label>
                    <Steps
                      size="small"
                      direction="vertical"
                      current={stateIdx}
                      items={items}
                    />    
                      {stateIdx < stateCheckArrays[stateWholeIdx].length && (
                        <Button type="primary" onClick={()=>handleChange(order.orderNum, stateIdx)}>
                          {stateFlow[stateCheckArrays[stateWholeIdx][stateIdx]][1]}
                        </Button>
                      )}
                      {stateIdx > 1 && (
                        <Button style={{margin: '0 8px'}}
                          onClick={() => handleChange(order.orderNum, stateIdx-2)}
                        >
                          이전
                        </Button>
                      )}
                  </Form.Group>
                </Card.Body>
                <Card.Footer className='fs-5'>
                  <ContentBlock fs='20px'>총 금액 : {order.totalPrice.toLocaleString()}원</ContentBlock>
                </Card.Footer>
              </Card>  
          </Col>)
        })}
      </Row>
    </ContentBlock>
  );
}

Working.defaultProps = {
  checkState: ''
}

export default Working;