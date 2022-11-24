import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { backEndUrl } from '../../configs';
import { ContentBlock, ButtonBlock,  Pre, parseToken,Span, Img,ImgBox } from '../Utils';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DatePicker } from 'antd';
import moment from 'moment';
import { AddrForm, CardForm } from "../InfoForm";
import { foodType } from '../../configs';

const DummyIframe = styled.iframe`
  display : none;
`;

const initTime = new Date().getTime() + 1.8e+6

const initOrderInfo = {
  "styleCode": 'SIMPLE',
  "wantedDeliveredTime": initTime,
  "address": ['', ''],
  "cardNum": ['', '', '', '']
}  

const CFDN = 1; // Champagne Festival Dinner Num

const AudioOrder = ({dinner, setModalOpen}) => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [styleToInfo, setStyleToInfo] = useState({});
  const [orderInfo, setOrderInfo] = useState(initOrderInfo);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customer, setCustomer] = useState(false);
  const [cookies, ,] = useCookies(['token']);

  useEffect(() => {
    const fetch = async()=> {
      let temp_Styles = {};
          
      await axios.get(
        backEndUrl + '/style'
      ).then(response => {
        response.data.map(style=>{
          temp_Styles[style.styleCode] = {
            name : style.name,
            content : style.content,
            price : style.price
          }
        })
        setStyleToInfo(temp_Styles);
      });

      const cust = await parseToken(cookies.token);
      setCustomer(cust);
      const style = await Number(dinner.dinnerNum) !== CFDN ? 'SIMPLE' : 'GRAND';
      setOrderInfo(order => ({...order, styleCode : style}))

      await axios.get(
        backEndUrl + '/customer/' + cust.num
      ).then(response => {
        setOrderInfo(order => ({
          ...order,
          address: response.data.address.split(","),
          cardNum: [0, 1, 2, 3].map((i) => response.data.cardNum.slice(i * 4, i * 4 + 4))
        }))
      });

      setTotalPrice(temp_Styles[style].price);

      dinner.foodCounts.map(foodCount => {
        setTotalPrice(totalPrice => totalPrice + foodCount.food.price * foodCount.count);
      });
    }
    fetch();
  }, []);

  const handleChange = e => {
    const id = e.target.id;
    let value;
    switch(e.target.name){
      case 'address':
        value = orderInfo.address.map((val, i) =>
                i === Number(id) ? e.target.value : val)
        break;
      case 'cardNum' :
        value = orderInfo.cardNum.map((val, i) =>
                i === Number(id) ? e.target.value : val)
        break;
      case 'styleCode' :
        value = e.target.value
        setTotalPrice(totalPrice => totalPrice + (styleToInfo[value].price-styleToInfo[orderInfo.styleCode].price));
        break;
      default:
        value = e.target.value
        break;
    }
    setOrderInfo({
      ...orderInfo,
      [e.target.name]: value
    })
  }

  const submitHandler = (event) => {
    const registOrder = async () => {
      // 요청이 시작 할 때에는 error 와 foods 를 초기화하고
      setError(null);
      await axios.post(
        backEndUrl + '/order', {
        orderDinnerDTOs: [{
          dinnerNum : dinner.dinnerNum,
          styleCode: orderInfo.styleCode,
          insertOrderFoodCountDTOs : dinner.foodCounts.map((foodCount)=>({
            "count": foodCount.count,
            "foodName": foodCount.food.name,
            "foodNum": foodCount.food.foodNum,
            "price": foodCount.food.price
          })) 
        }],
        insertOrderDTO: {
          "customerNum": customer.num,
          "totalPrice": totalPrice,
          "wantedDeliveredTime": orderInfo.wantedDeliveredTime,
          "address": orderInfo.address.join(','),
          "cardNum": orderInfo.cardNum.join('')
        }
      }
      ).then(res =>
        Swal.fire({
          title: '주문 완료',
          text: res.data.text,
          icon: 'success',
          confirmButtonText: '확인'
        }).then((res)=>{
          setModalOpen(false);
        })
      ).catch(error =>{
        console.log(error);
        Swal.fire({
          title: '주문 실패',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: '확인'
        })}
      );
    };
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      registOrder();
    }
    setValidated(true);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <ContentBlock width='350px'>
      <DummyIframe name="dummy"></DummyIframe>
      <Pre fs='22px' text_align='center' padding='0 0 10px 0' mb='15px' color='rgba(139,69,19,0.2)'>{dinner.name}</Pre>
      <ContentBlock padding='10px 10px 0 10px'>
        {foodType.map(type=>{
          return(
            <div key={type}>
              {dinner.foodCounts.map(foodCount=>{
                if(foodCount.food.type !== type || foodCount.count === 0)return;
                return(
                  <ContentBlock width='auto' display='flex' flex_direction='row' key={Number(foodCount.food.foodNum)} className='mb-3'>
                    <ImgBox height='10px'>
                      <Img width='20px' height='20px' src={'/imgs/foods/'+type+'.PNG'}/>
                    </ImgBox>
                    <ContentBlock fs='14px' margin='0px 5px 0 0' width='30%'>{foodCount.food.name}</ContentBlock>
                    <ContentBlock fs='14px' margin='0px 5px 0 0' width='15%'>{foodCount.count}개</ContentBlock>
                    <ContentBlock fs='14px' margin='0px 5px 0 0' width='30%'>{(foodCount.food.price * foodCount.count).toLocaleString()}원</ContentBlock>
                  </ContentBlock>
                )
              })}
            </div>
          )
        })}
        <hr/>
        <ContentBlock display='flex'>
          <ContentBlock margin='0 10px 0 0' fs='14px'>스타일</ContentBlock>
          <ContentBlock width='180px'>
            <Form.Select className='audio-order'  name="styleCode" value={orderInfo.styleCode} onChange={handleChange} aria-label="Default select example">
              {Object.entries(styleToInfo).map(info=>{
                if(info[0] !=='SIMPLE' || dinner.dinnerNum !== CFDN){
                  return <option value={info[0]}>{info[1].name} : +{info[1].price.toLocaleString()}원</option>
                }                    
              })}
            </Form.Select>
          </ContentBlock>     
          <Tooltip title={
            <ContentBlock width='260px' padding='5px' color='white'>
              <Span fs='12px' > 디너가 제공되는 스타일을 선택할 수 있습니다. </Span>
              <hr/>
              {Object.entries(styleToInfo).map((info)=>
                <ContentBlock margin='0 0 10px 0' color='white'>
                  {'< '+info[1].name+' >'}
                  <br/>
                  {info[1].content}    
                </ContentBlock>
              )}
            </ContentBlock>
          }>
            <IconButton aria-label="question" color="warning"> 
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </ContentBlock>      
      </ContentBlock>
      <Pre text_align='end' mt='10px' fw='600' fs='18px'>총 금액 : {totalPrice.toLocaleString()}원</Pre>
      <Pre mb='20px' color='black' fw='600' fs='20px'>결제</Pre>
      <Form className='audio-order' noValidate validated={validated} onSubmit={submitHandler} target='dummy'>
        <Form.Group className="mb-3">
          <Form.Label>주소</Form.Label>
          <AddrForm address={orderInfo.address} handleChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>카드 번호</Form.Label>
          <CardForm cardNum={orderInfo.cardNum} handleChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicContent">
          <Form.Label className="d-block">배달 요청 시간 <Span fs='12px'>( 30분 뒤부터 가능합니다. )</Span></Form.Label>
          <DatePicker
            showNow={false}
            placement='topLeft'
            showTime={{
              format: 'HH:mm',
            }}
            disabledDate={(time) => initTime >= new Date(time).getTime()}
            defaultValue={moment(new Date(initTime), "MM-DD HH:mm")}
            onChange={(time) => setOrderInfo({
              ...orderInfo,
              wantedDeliveredTime: new Date(time),
            })}
            format="MM-DD HH:mm"
            minuteStep={5}
          />
        </Form.Group>
        <ButtonBlock>
          <Button variant="primary" type="submit">
            주문
          </Button>
        </ButtonBlock>
      </Form>
    </ContentBlock>
  );
};

export default AudioOrder;