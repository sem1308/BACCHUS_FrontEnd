import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ModalBlock, ContentBlock, ButtonBlock, Img} from '../Utils';
import FoodNavBar from '../FoodNavBar';
import {encodeFileToBase64} from '../Utils';

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

const DinnerModal = ({imageSrc,dinner,submitHandler, isExist, setImageSrc,
  foodCounts, foodCountsType, setFoodCountsType, foods, handleFoodCountChange, handleChange}) => {
  return (
    <ModalBlock height='700px' flex_direction='column' overflow='auto'>
      <ContentBlock display='flex' flex_direction='column'>
        {<Img src={imageSrc} alt="preview-img" />}
        <FoodImgUploadLabel for="ex_file">이미지 업로드</FoodImgUploadLabel>
        <FoodImgUploadButton type='file' 
          accept='image/jpg,impge/png,image/jpeg,image/gif,image/PNG' 
          name='food_profile_img' 
          id="ex_file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0],setImageSrc);
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
  );
};

export default DinnerModal;