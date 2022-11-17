import React from 'react';
import styled from 'styled-components';
import {foodType} from '../../configs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Img, ModalBlock, ContentBlock, ButtonBlock } from '../Utils';

const ImgBlock = styled.div`
  width : 50%;
  display: flex;
  flex-direction : column;
`

const FoodModal = ({food, imageSrc, handleChange, submitHandler, isExist}) => {
  return(
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
        <Form.Group className="mb-3" controlId="formBasicType">
          <Form.Label>타입</Form.Label>
          <Form.Select name="type" value={food.type} onChange={handleChange} aria-label="Default select example">
            {foodType.map(type=>
                <option key={type} value={type}>{type}</option>
              )
            }
          </Form.Select>        
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicState">
          <Form.Label>상태</Form.Label>
          <Form.Select name="state" value={food.state} onChange={handleChange} aria-label="Default select example">
            <option value="SA">판매중</option>
            <option value="SNA">판매 중지</option>
          </Form.Select>        
        </Form.Group>
        <ButtonBlock>
          <Button variant="primary" type="submit" onClick={submitHandler}>
            {isExist ? "수정" : "추가"} 
          </Button>            
        </ButtonBlock>
      </ContentBlock>  
    </ModalBlock>
  )
}

export default FoodModal;