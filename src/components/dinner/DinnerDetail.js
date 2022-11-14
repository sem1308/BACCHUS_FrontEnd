import Header from '../Header';
import styled from 'styled-components';
import NavBar from '../NavBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backEndUrl } from '../../configs';
import Modal from '../Modal';
import { DinnerBlock, ContentBlock, Img, ImgBox, ButtonBlock, Btn, Pre } from '../Utils';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import DinnerFoods from './DinnerFoods';
import DinnerModal from './DinnerModal';

const DetailTextBlock = styled.div`
  position : ${props => props.position || 'relative'};
  bottom : 0px;
  padding: 0px;
`;

const initTime = new Date().getTime() + 1.8e+6

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
  const [modalOpen, setModalOpen] = useState(false);
  const [validated, setValidated] = useState(false);

  console.log("START");

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


    const submitHandler = (event) => {
      const registOrder = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 foods 를 초기화하고
          setError(null);
          await axios.post(
            backEndUrl+'/order', {
              foodCountDTOs : foodCounts,
              insertOrderDTO : {
                "dinnerNum" : [dinner.dinnerNum],
                "customerNum" : 3,
                "totalPrice": totalPrice,
                "styleCode": orderInfo.styleCode,
                "wantedDeliveredTime" : orderInfo.wantedDeliveredTime,
                "address" : orderInfo.address.join(','),
                "cardNum" : orderInfo.cardNum.join('')
              }
            }
          ).then(res=>
            Swal.fire({
              title: '주문 완료',
              text: res.data.text,
              icon: 'success',
              confirmButtonText: '확인'
            }).then((res) => {
              /* Read more about isConfirmed, isDenied below */
              if (res.isConfirmed) {
                closeModal()
              }else{
              }
            })
          ).catch(res=>
            Swal.fire({
              title: '주문 실패',
              text: res.data.text,
              icon: 'error',
              confirmButtonText: '확인'
            }).then((res) => {
              /* Read more about isConfirmed, isDenied below */
              if (res.isConfirmed) {
                closeModal()
              }else{
              }
            })
          );
        } catch (e) {
          console.log(e);
          setError(e);
        }
      };

      const form = event.currentTarget;
      console.log(form);
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }else{
        registOrder();
      }
    };

    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      registOrder();
      // Swal.fire({
      //   title: '주문 완료',
      //   text: '주문이 완료되었습니다.',
      //   icon: 'success',
      //   confirmButtonText: '확인'
      // }).then((res) => {
      //   /* Read more about isConfirmed, isDenied below */
      //   if (res.isConfirmed) {
      //     closeModal()
      //   }
      //   else{
      //   }
      // });
    }
    setValidated(true);
  };

  useEffect(() => {
    const fetchDinner = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 dinners 를 초기화하고
        setError(null);
        setDinner(null);
        setFoodCounts([]);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);

        let temp_Foods = [];
        await axios.get(
          backEndUrl + '/food'
        ).then(response => {
          temp_Foods = response.data.map(food => (
            {
              foodNum: food.foodNum,
              count: 0,
              type: food.type,
              name: food.name,
              price: food.price
            }))
        });

        await axios.get(
          //'http://13.125.101.4:8080/dinner/'+dinnerNum
          backEndUrl + '/dinner/' + dinnerNum
        ).then(response => {
          setDinner(response.data)

          response.data.foodCounts.map(foodCount => {
            setTotalPrice(totalPrice => totalPrice + foodCount.food.price * foodCount.count);
            const findIndex = temp_Foods.findIndex(element => element.foodNum === Number(foodCount.food.foodNum));
            if (findIndex != -1) {
              temp_Foods[findIndex] = {
                ...temp_Foods[findIndex],
                count: foodCount.count,
                foodDinnerCountNum: foodCount.foodDinnerCountNum
              };
            }
          });
          setFoodCounts(temp_Foods);
        });
      } catch (e) {
        console.log(e)
        setError(e);
      }
      setLoading(false);
    };
    setTotalPrice(0);
    fetchDinner();
  }, [dinnerNum]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!dinner) return null;

  console.log(orderInfo);

  return (
    <div>
      <Header></Header>
      <DinnerBlock>
        <NavBar></NavBar>
        <ContentBlock display='flex' flex_direction='column' padding='0 130px'>
          <ContentBlock display='flex'>
            <ImgBox height='300px' width='50%' display='flex' margin='30px 30px 30px 0'>
              <Img src={`/imgs/dinners/${dinner.name}.jpeg`}></Img>
            </ImgBox>
            <ContentBlock width='50%' height='300px'>
              <Pre color='#decdb9'>{dinner.name}</Pre>
              <Pre lh='24px' mt='20px' fs='16px'>{dinner.extraContent}</Pre>
              <DetailTextBlock position='absolute'>
                <Pre lh='30px' mt='20px' fs='20px' fw='600'>가격</Pre>
                <Pre fs='20px' >{totalPrice.toLocaleString()} 원</Pre>
              </DetailTextBlock>
            </ContentBlock>
          </ContentBlock>
          <DinnerFoods foodCounts={foodCounts} handleFoodCountChange={handleFoodCountChange} />
          <ButtonBlock width='60%'>
            <Btn margin='30px 5px' radius='10%' bg_color='rgba(139,69,19,0.7)' bg_color_hover='rgba(139,69,19,1)' onClick={() => openModal()}>주문하기</Btn>
          </ButtonBlock>
        </ContentBlock>
      </DinnerBlock>
      <Modal open={modalOpen} close={closeModal} header="주문">
        <DinnerModal foodCounts={foodCounts} handleChange={handleChange} submitHandler={submitHandler}
          orderInfo={orderInfo} setOrderInfo={setOrderInfo} validated={validated}
          dinner={dinner} totalPrice={totalPrice} initTime={initTime} />
      </Modal>
    </div>
  )
}

export default DinnerDetail;