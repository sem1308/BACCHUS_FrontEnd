import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import {foodType, backEndUrl} from '../../configs';
import {ContentBlock, ButtonBlock, Btn } from '../Utils';
import FoodModal from './FoodModal';
import FoodTable from './FoodTable';

const FoodInit = {
  'name' : '',
  'price' : 0,
  'stock' : 0,
  'type' : foodType[0],
  'state' : 'SA'
}

function FoodList() {
  const [foods, setFoods] = useState(null);
  const [isExist, setIsExist] = useState(false);
  const [food, setFood] = useState(FoodInit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('/imgs/foods/'+foodType[0]+'.PNG');

  const openModal = (food=null) => {
    if(food !== null){
      setFood(food);
      setImageSrc('/imgs/foods/'+food.type+'.PNG')
      setIsExist(true);
    }else{
      setImageSrc('/imgs/foods/'+foodType[0]+'.PNG')
      setFood(FoodInit);
      setIsExist(false);      
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setImageSrc('');
  };

  const handleChange = e => {
    let value = e.target.value;
    if(e.target.name==='type'){
      setImageSrc('/imgs/foods/'+e.target.value+'.PNG')
    }else if(e.target.name==='price' || e.target.name==='stock'){
      try{
        value = Number(e.target.value);
        if(!value) value = 0;
      }catch(e){
        value = 0;
      }
    }
    setFood({
      ...food,
      [e.target.name]: value,
    })
  }

  const submitHandler = () => {
    const registFoods = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 foods 를 초기화하고
        if(isExist){
          await axios.put(
            backEndUrl+'/food/'+food.foodNum, food
          );
        }else{
          await axios.post(
            backEndUrl+'/food', food
          );
        }
        fetchFoods();
      } catch (e) {
        console.log(e)
      }
    };
    registFoods();
    closeModal();
  };

  const fetchFoods = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 foods 를 초기화하고
      setError(null);
      setFoods(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(
        backEndUrl+'/food'
      );
      setFoods(response.data); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      console.log(e)
      setError(e);
    }
    setLoading(false);
  };  

  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!foods) return null;
  // 음식 내용 : foodNum, name, price, type
  return (
    <ContentBlock padding='15px'>
      <FoodTable foods={foods} openModal={openModal}/>
      <ButtonBlock><Btn radius='10%' bg_color='rgba(139,69,19,0.7)' bg_color_hover='rgba(139,69,19,1)' onClick={()=>openModal()}>음식 추가</Btn></ButtonBlock>
      <Modal open={modalOpen} close={closeModal} header={isExist ? "음식 수정" : "음식 추가"}>
        <FoodModal food={food} imageSrc={imageSrc} isExist={isExist}
                  handleChange={handleChange} submitHandler={submitHandler}/>
      </Modal>
    </ContentBlock>
  );
}

export default FoodList;