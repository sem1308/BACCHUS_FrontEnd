import Header from '../Header';
import styled from 'styled-components';
import NavBar from '../NavBar';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { backEndUrl } from '../../configs';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import { DinnerBlock, ContentBlock, Img, ImgBox, ButtonBlock, Btn, Pre, parseToken,Span } from '../Utils';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import DinnerFoods from './DinnerFoods';
import OrderDinnerModal from './OrderDinnerModal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Form } from 'react-bootstrap';

const DetailTextBlock = styled.div`
  position : ${props => props.position || 'relative'};
  width : 300px;
  bottom :${props => props.bottom || '0px'};
  padding: 0px;
`;

const initTime = new Date().getTime() + 1.8e+6

const CFDN = 2; // Champagne Festival Dinner Num

const initOrderInfo = {
  "styleCode": 'SIMPLE',
  "wantedDeliveredTime": initTime,
  "address": ['', ''],
  "cardNum": ['', '', '', '']
}  

function DinnerDetail({ dinnerNum }) {
  const [dinner, setDinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [foodCounts, setFoodCounts] = useState([]);
  const [orderInfo, setOrderInfo] = useState(initOrderInfo);
  const [styleToInfo, setStyleToInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [customer, setCustomer] = useState(false);
  const navigation = useNavigate();
  const [cookies, ,] = useCookies(['token']);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setValidated(false);
  };

  const handleFoodCountChange = (e) => {
    let value;
    try {
      value = Number(e.target.value);
    } catch (e) {
      value = 0;
    }
    const fc = foodCounts.map(foodCount =>
      foodCount.foodNum === Number(e.target.id) ? { ...foodCount, [e.target.name]: value } : foodCount
    )
    setFoodCounts(fc);
    setTotalPrice(0);
    fc.map(foodCount => {
      setTotalPrice(totalPrice => totalPrice + foodCount.price * foodCount.count);
    });
  }

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
      const fc = await foodCounts.filter((foodCount)=>foodCount.count !== 0);
      await axios.post(
        backEndUrl + '/order', {
        orderDinnerDTOs: [{
          dinner_num : dinnerNum,
          styleCode: orderInfo.styleCode,
          insertOrderFoodCountDTOs : fc
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
        }).then((res) => {
          /* Read more about isConfirmed, isDenied below */
          if (res.isConfirmed) {
            closeModal();
            navigation('/dinner');
          } else {
          }
        })
      ).catch(error =>
        Swal.fire({
          title: '주문 실패',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: '확인'
        })
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

  const checkLogin = () => {
    return cookies.token === undefined;
  }

  useEffect(() => {
    if (checkLogin()) {
      navigation('/login');
    } else {
      const fetchDinner = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 dinners 를 초기화하고
          setError(null);
          setDinner(null);
          setFoodCounts([]);
          // loading 상태를 true 로 바꿉니다.
          setLoading(true);
          const cust = await parseToken(cookies.token);
          setCustomer(cust);
          const style = await Number(dinnerNum) !== CFDN ? 'SIMPLE' : 'GRAND';
          setOrderInfo(order => ({...order, styleCode : style}))
          
          let temp_Foods = [];
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

          await axios.get(
            backEndUrl + '/food'
          ).then(response => {
            temp_Foods = response.data.filter((food)=>food.state!=='SNA');
            temp_Foods = temp_Foods.map(food => {
              return {
                foodNum: food.foodNum,
                count: 0,
                type: food.type,
                foodName: food.name,
                price: food.price
              }})
          });
          setTotalPrice(temp_Styles[style].price);
          await axios.get(
            backEndUrl + '/dinner/' + dinnerNum
          ).then(response => {
            setDinner(response.data)
            response.data.foodCounts.map(foodCount => {
              setTotalPrice(totalPrice => totalPrice + foodCount.food.price * foodCount.count);
              const findIndex = temp_Foods.findIndex(element => element.foodNum === Number(foodCount.food.foodNum));
              if (findIndex !== -1) {
                temp_Foods[findIndex] = {
                  ...temp_Foods[findIndex],
                  count: foodCount.count,
                };
              }
            });
            setFoodCounts(temp_Foods);
          });

          await axios.get(
            backEndUrl + '/customer/' + cust.num
          ).then(response => {
            setOrderInfo(order => ({
              ...order,
              address: response.data.address.split(","),
              cardNum: [0, 1, 2, 3].map((i) => response.data.cardNum.slice(i * 4, i * 4 + 4))
            }))
          });
        } catch (e) {
          console.log(e)
          setError(e);
        }
        setLoading(false);
      };
      setTotalPrice(0);
      fetchDinner();
    }
  }, [dinnerNum]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!dinner) return null;

  return (
    <div>
      <Header></Header>
      <DinnerBlock>
        <NavBar></NavBar>
        <ContentBlock display='flex' flex_direction='column' padding='50px 130px'>
          <ContentBlock display='flex' margin='0 0 30px 0'>
            <ImgBox height='300px' width='400px' display='flex' margin='0 40px 0 0'>
              <Img src={`/imgs/dinners/${dinner.name}.jpeg`}></Img>
            </ImgBox>
            <ContentBlock width='300px' height='300px'>
              <Pre color='#decdb9'>{dinner.name}</Pre>
              <Pre lh='24px' mt='20px' fs='16px'>{dinner.extraContent}</Pre>
              <DetailTextBlock  position='absolute' bottom='85px'>
                <ContentBlock display='flex'>
                  <ContentBlock width='30%' margin='0 10px 0 0'>스타일</ContentBlock>
                  <Form.Select name="styleCode" value={orderInfo.styleCode} onChange={handleChange} aria-label="Default select example">
                    {Object.entries(styleToInfo).map(info=>{
                      if(info[0] !=='SIMPLE' || dinner.dinnerNum !== CFDN){
                        return <option value={info[0]}>{info[1].name} : +{info[1].price.toLocaleString()}원</option>
                      }                    
                    })}
                  </Form.Select>
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
              </DetailTextBlock>
              <DetailTextBlock position='absolute' bottom='-10px'>
                <Pre lh='30px' mt='20px' fs='20px' fw='600'>가격</Pre>
                <Pre fs='20px' >{totalPrice.toLocaleString()} 원</Pre>
              </DetailTextBlock>
            </ContentBlock>
          </ContentBlock>
          <DinnerFoods foodCounts={foodCounts} handleFoodCountChange={handleFoodCountChange} />            
          <ButtonBlock width='76%'>
            <Btn margin='30px 5px' radius='10%' bg_color='rgba(139,69,19,0.7)' bg_color_hover='rgba(139,69,19,1)' onClick={() => openModal()}>주문하기</Btn>
          </ButtonBlock>
        </ContentBlock>
      </DinnerBlock>
      <Modal open={modalOpen} close={closeModal} header="주문">
        <OrderDinnerModal foodCounts={foodCounts} handleChange={handleChange} submitHandler={submitHandler}
          orderInfo={orderInfo} setOrderInfo={setOrderInfo} validated={validated}
          dinner={dinner} totalPrice={totalPrice} initTime={initTime} styleToInfo={styleToInfo} />
      </Modal>
    </div>
  )
}

export default DinnerDetail;