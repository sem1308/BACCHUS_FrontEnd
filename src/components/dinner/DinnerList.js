import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import { backEndUrl } from '../../configs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CardImgBox, CardTextBox, ModalBlock, ContentBlock, ButtonBlock, Btn, Img} from '../Utils';
import FoodNavBar from '../FoodNavBar';

const FoodImgUploadLabel = styled.label`
  width:140px;
  display: inline-block;
  padding: .5em .75em;
  color: white;
  font-size: inherit;
  text-align : center;
  line-height: normal;
  vertical-align: middle;
  background-color: #D2B48C;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: .25em;

  &:hover{
    background-color: #B8860B;
  }
`

const FoodImgUploadButton = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip:rect(0,0,0,0);
  border: 0;
`

const DinnerInit = {
  "name": "",
  "extraContent": "",
  "numPeople": 0
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
        if(findIndex != -1) {
          copyArray[findIndex] = {...copyArray[findIndex], 
            count: foodCount.count, 
            foodDinnerCountNum : foodCount.foodDinnerCountNum};
        }
      })
      console.log(copyArray)
      setFoodCounts(copyArray);
      setDinner({
        "dinnerNum" : dinner.dinnerNum,
        "name": dinner.name,
        "extraContent": dinner.extraContent,
        "numPeople": dinner.numPeople
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

  const encodeFileToBase64 = (fileBlob) => {
    console.log(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

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
        //'http://13.125.101.4:8080/dinner'
        backEndUrl+'/food'
      ).then(response=>{
        setFoods(response.data) // 데이터는 response.data 안에 들어있습니다.
        setFoodCounts(
          response.data.map(food=>(
            {
              foodDinnerCountNum : -1,
              foodNum : food.foodNum,
              count : 0,
              type : food.type
            }))
        )   
      });

      await axios.get(
        //'http://13.125.101.4:8080/dinner'
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
      <Row xs={4} md={4} className="g-4">
        {dinners.map(dinner => (
          <Col key={dinner.dinnerNum}>
              <Card>
                <Link to={`/dinner/${dinner.dinnerNum}`}>
                  <CardImgBox alt="" variant='top' className="card-img" src={`/imgs/dinners/${dinner.name}.jpeg`}></CardImgBox>
                </Link>
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
        ))}
      </Row>
      {
        IsEmployee ?
        <>
          <ButtonBlock><Btn margin='15px 5px' radius='10%' bg_color='rgba(139,69,19,0.7)' bg_color_hover='rgba(139,69,19,1)' onClick={()=>openModal()}>디너 추가</Btn></ButtonBlock>
          <Modal open={modalOpen} close={closeModal} header={isExist ? "디너 수정" : "디너 추가"}>
            <ModalBlock height='700px' flex_direction='column' overflow='auto'>
              <ContentBlock display='flex' flex_direction='column'>
                {<Img src={imageSrc} alt="preview-img" />}
                <FoodImgUploadLabel for="ex_file">이미지 업로드</FoodImgUploadLabel>
                <FoodImgUploadButton type='file' 
                  accept='image/jpg,impge/png,image/jpeg,image/gif,image/PNG' 
                  name='food_profile_img' 
                  id="ex_file"
                  onChange={(e) => {
                    encodeFileToBase64(e.target.files[0]);
                  }}>
                </FoodImgUploadButton>
              </ContentBlock>
              <ContentBlock>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>이름</Form.Label>
                  <Form.Control name="name" value={dinner.name} onChange={handleChange} placeholder="Enter name" />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicStock">
                  <Form.Label>적정인원</Form.Label>
                  <Form.Control name="numPeople" value={dinner.numPeople} onChange={handleChange} placeholder="0" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicContent">
                  <Form.Label>설명</Form.Label>
                  <Form.Control as='textarea' rows={5} name="extraContent" value={dinner.extraContent} onChange={handleChange} placeholder="Enter Content" />
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Label className="mb-3">음식</Form.Label>
                  <FoodNavBar setFoodCountsType={setFoodCountsType}></FoodNavBar>
                  {foodCounts.map(foodCount=>{
                    if(foodCount.type !== foodCountsType) return;
                    const findIndex = foods.findIndex(element => element.foodNum === Number(foodCount.foodNum));
                    if(findIndex === -1) {
                      setError('음식 데이터를 찾을 수 없습니다.')
                    }                    
                    return(
                      <ContentBlock width='70%' display='flex' flex_direction='row' key={Number(foodCount.foodNum)} className='mb-3'>
                        <ContentBlock fs='14px' margin='0px 20px 10px 0' width='30%'>{foods[findIndex].name}</ContentBlock> 
                        <ContentBlock width='70%'>
                          <Form.Control className='w-50' id={Number(foodCount.foodNum)} name="count" value={foodCount.count} onChange={handleFoodCountChange} placeholder="개수 입력" />
                        </ContentBlock>
                      </ContentBlock>
                    )
                  })}
                </Form.Group>
                <ButtonBlock>
                  <Button className="mt-5" variant="primary" type="submit" onClick={submitHandler}>
                    {isExist ? "수정" : "추가"} 
                  </Button>            
                </ButtonBlock>
              </ContentBlock>  
            </ModalBlock>
          </Modal>
        </> : ''
      }
    </div>
  );
}

export default DinnerList;