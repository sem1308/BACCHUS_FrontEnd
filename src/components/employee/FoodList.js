import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../Modal';
import {foodType, backEndUrl} from '../../configs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const FoodBlock = styled.div`
  padding : 15px;
`;

const ModalBlock = styled.div`
  padding : 20px;
  position: relative;
  margin: 0 auto;
  display: flex;
`

const ContentBlock = styled.div`
  padding-left : 30px;
`

const ButtonBlock = styled.div`
  display : flex;
  width: ${props => props.width || 'auto'};
  justify-content : right;
`

const Btn = styled.button`
  border-radius : ${props => props.radius || '20%'};
  padding : 10px;
  margin : 5px;
  color : white;
  border : 0;
  outline:0;
  background-color : ${props => props.bg_color || 'rgba(184,134,11,0.7)'};

  &:hover{
    background-color : ${props => props.bg_color_hover || 'rgba(184,134,11,1)'};
  }
`

const ImgBlock = styled.div`
  width : 50%;
  display: flex;
  flex-direction : column;
`
const ImgBox = styled.div`
  display : inline-flex;
  height: 45px;
  width: 45px;
  align-content : center;
  justify-content : center;
`

const Img = styled.img`
  height: ${props => props.height || '300px'};
  max-width: 100%;
  margin : auto;
`

const TH = styled.th`
  margin : auto;
`
const TD = styled.td`
  padding : 10px;
`

const FoodInit = {
  'name' : '',
  'price' : 0,
  'stock' : 0,
  'type' : foodType[0]
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
    if(e.target.name==='type'){
      setImageSrc('/imgs/foods/'+e.target.value+'.PNG')
    }
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = () => {
    const registFoods = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 foods 를 초기화하고
        setError(null);
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
        setError(e);
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
        //'http://13.125.101.4:8080/dinner'
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
    <FoodBlock>
      <Table responsive="lg">
        <thead>
          <tr>
            <TH>#</TH>
            <TH>종류</TH>
            <TH>이름</TH>
            <TH>가격</TH>
            <TH>수량</TH>
            <TH width='100px'></TH>
          </tr>
        </thead>
        {foods.map(food => (
          <tr>
            <TD>{food.foodNum}</TD>
            <td><ImgBox><Img height='30px' src={'/imgs/foods/'+food.type+'.PNG'}/></ImgBox></td>
            <TD>{food.name}</TD>
            <TD>{food.price}</TD>
            <TD>{food.stock}</TD>
            <Btn onClick={()=>openModal(food)}>수정</Btn>
          </tr>
        ))}
      </Table>
      <ButtonBlock><Btn radius='10%' bg_color='rgba(139,69,19,0.7)' bg_color_hover='rgba(139,69,19,1)' onClick={()=>openModal()}>음식 추가</Btn></ButtonBlock>
      <Modal open={modalOpen} close={closeModal} header={isExist ? "음식 수정" : "음식 추가"}>
        <ModalBlock>
          <ImgBlock>
            {<Img src={imageSrc} alt="preview-img" />}
          </ImgBlock>
          <ContentBlock>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>이름</Form.Label>
              <Form.Control name="name" value={food.name} onChange={handleChange} placeholder="Enter name" />
            </Form.Group>        
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>가격</Form.Label>
              <Form.Control name="price" value={food.price} onChange={handleChange} placeholder="0" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStock">
              <Form.Label>수량</Form.Label>
              <Form.Control name="stock" value={food.stock} onChange={handleChange} placeholder="0" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStock">
              <Form.Label>타입</Form.Label>
              <Form.Select name="type" value={food.type} onChange={handleChange} aria-label="Default select example">
                {foodType.map(type=>
                    <option key={type} value={type}>{type}</option>
                  )
                }
              </Form.Select>        
            </Form.Group>
            <ButtonBlock>
              <Button variant="primary" type="submit" onClick={submitHandler}>
                {isExist ? "수정" : "추가"} 
              </Button>            
            </ButtonBlock>
          </ContentBlock>  
        </ModalBlock>
      </Modal>
    </FoodBlock>
  );
}

export default FoodList;