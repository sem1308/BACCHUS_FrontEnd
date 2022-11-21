import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import { backEndUrl } from '../../configs';
import { CardImgBox, CardTextBox, ButtonBlock, Btn, ContentBlock} from '../Utils';
import DinnerModal from './DinnerModal';

const DinnerInit = {
  "name": "",
  "extraContent": "",
  "numPeople": 0,
  "state" : "SA"
}

function DinnerList({IsEmployee}) {
  const [dinners, setDinners] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [foods, setFoods] = useState([]);
  const [isExist, setIsExist] = useState(false);
  const [foodCounts, setFoodCounts] = useState([]);
  const [foodCountsType, setFoodCountsType] = useState();
  const [dinner, setDinner] = useState(DinnerInit);

  const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('/imgs/dinner.png');

  const handleFoodCountChange = (e) => {
    let value;
    try{
      value = Number(e.target.value);
    }catch(e){
      value = 0;
    }
    setFoodCounts(
      foodCounts.map(foodCount =>
        foodCount.foodNum === Number(e.target.id) ? { ...foodCount, [e.target.name] : value } : foodCount
      )
    );
  }

  const openModal = (dinner=null) => {
    setImageSrc('/imgs/dinner.png')
    if(dinner !== null){
      let copyArray = [...foodCounts];
      dinner.foodCounts.map(foodCount => {
        const findIndex = foodCounts.findIndex(element => element.foodNum === Number(foodCount.food.foodNum));
        if(findIndex !== -1) {
          copyArray[findIndex] = {...copyArray[findIndex], 
            count: foodCount.count, 
            dinnerFoodCountNum : foodCount.dinnerFoodCountNum};
        }
      })
      console.log(copyArray)
      setFoodCounts(copyArray);
      setDinner({
        "dinnerNum" : dinner.dinnerNum,
        "name": dinner.name,
        "extraContent": dinner.extraContent,
        "numPeople": dinner.numPeople,
        "state" : dinner.state
      });
      setIsExist(true);
    }else{
      setDinner(DinnerInit);
      setFoodCounts(
        foodCounts.map(foodCount =>(
          { ...foodCount, count : 0 }
        ))
      );
      setIsExist(false);      
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setImageSrc('');
  };
  
  const handleChange = e => {
    setDinner({
      ...dinner,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = () => {
    const registDinner = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 foods 를 초기화하고
        setError(null);
        console.log(foodCounts)
        if(isExist){
          await axios.put(
            backEndUrl+'/dinner/'+dinner.dinnerNum, {
              foodCountDTOs : foodCounts,
              updateDinnerDTO: dinner
            }
          );
        }else{
          await axios.post(
            backEndUrl+'/dinner', {
              foodCountDTOs : foodCounts,
              insertDinnerDTO : dinner
            }
          );
        }
        fetchDinners();
      } catch (e) {
        console.log(e)
        setError(e);
      }
    };
    registDinner();
    closeModal();
  };

  const fetchDinners = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 dinners 를 초기화하고
      setError(null);
      setDinners(null);
      setFoods([]);
      setDinner([]);
      setFoodCounts([]);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      
      await axios.get(
        backEndUrl+'/food'
      ).then(response=>{
        setFoods(response.data) // 데이터는 response.data 안에 들어있습니다.
        setFoodCounts(
          response.data.map(food=>{            
            return {
              dinnerFoodCountNum : -1,
              foodNum : food.foodNum,
              count : 0,
              type : food.type
            }})
        )   
      });

      await axios.get(
        backEndUrl+'/dinner'
      ).then(response=>
        setDinners(response.data) // 데이터는 response.data 안에 들어있습니다.
      );
    } catch (e) {
      console.log(e)
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDinners();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!dinners) return null;
  // 음식 내용 : foodNum, name, price, type
  return (
    <div>
      <Row xs={4} md={3} className="g-4">
        {dinners.map(dinner => {
          const state = dinner.state;
          if(!IsEmployee && state==='SNA') return;

          return <Col key={dinner.dinnerNum}>
              <Card>
                {state==='SA'&& !IsEmployee ? 
                <Link to={`/dinner/${dinner.dinnerNum}`}>
                  <CardImgBox alt="" variant='top' className="card-img" src={`/imgs/dinners/${dinner.name}.jpeg`}></CardImgBox>
                </Link> 
                :<ContentBlock opacity={state==='SA' ? '1' : '0.5'}>
                  <CardImgBox alt="" variant='top' className="card-img" src={`/imgs/dinners/${dinner.name}.jpeg`}></CardImgBox>
                </ContentBlock>}
                <Card.Body>
                    <Card.Title>{dinner.name}</Card.Title>
                    <CardTextBox>
                        {dinner.extraContent}
                    </CardTextBox>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">적정 인원 : {dinner.numPeople}</small>   
                </Card.Footer>
              </Card> 
              {
                IsEmployee ?
                <ButtonBlock><Btn radius='10%' onClick={()=>openModal(dinner)}>수정</Btn></ButtonBlock>
                : ''
              }
          </Col>
          }
        )}
      </Row>
      {
        IsEmployee ?
        <>
          <ButtonBlock><Btn margin='15px 5px' radius='10%' bg_color='rgba(139,69,19,0.7)' bg_color_hover='rgba(139,69,19,1)' onClick={()=>openModal()}>디너 추가</Btn></ButtonBlock>
          <Modal open={modalOpen} close={closeModal} header={isExist ? "디너 수정" : "디너 추가"}>
            <DinnerModal imageSrc={imageSrc} setImageSrc={setImageSrc} dinner={dinner} submitHandler={submitHandler}
                        foodCounts={foodCounts} setFoodCountsType={setFoodCountsType} 
                        foods={foods} handleFoodCountChange={handleFoodCountChange} handleChange={handleChange}
                        foodCountsType = {foodCountsType} isExist={isExist}/>            
          </Modal>
        </> : ''
      }
    </div>
  );
}

export default DinnerList;