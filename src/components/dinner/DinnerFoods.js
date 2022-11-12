import React from "react";
import { Form } from "react-bootstrap";
import { foodType } from "../../configs";
import styled from "styled-components";
import {ContentBlock, Img, ImgBox, Pre} from '../Utils';

const DinnerDetailBox = styled.div`
    position: relative;
    width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction : column;
`;

const DinnerFoods = ({foodCounts,handleFoodCountChange}) => {
  return (
    <DinnerDetailBox>
      {foodType.map(type=>{
        return(
          <>
            <Pre lh='40px' mt='10px' fs='20px' fw='600' width='200px'>
              <ImgBox width='100px'>
                <ContentBlock>{type}</ContentBlock>
                <Img width='30px' height='30px' src={'/imgs/foods/'+type+'.PNG'}/>                            
              </ImgBox>
            </Pre>
            {foodCounts.map(foodCount=>{
              if(foodCount.type !== type)return;
              return(
                <ContentBlock width='70%' display='flex' flex_direction='row' key={Number(foodCount.foodNum)} className='mb-3'>
                  <ContentBlock fs='14px' margin='0px 20px 0 0' width='30%'>{foodCount.name}</ContentBlock> 
                  <ContentBlock fs='14px' margin='0px 20px 0 0' width='30%'>{foodCount.price.toLocaleString()}</ContentBlock> 
                  <ContentBlock width='70%'>
                    <Form.Control className='w-50' id={Number(foodCount.foodNum)} name="count" 
                    value={foodCount.count} onChange={handleFoodCountChange} placeholder="개수 입력" />
                  </ContentBlock>
                </ContentBlock>
              )
            })}
          </>
        )
      })}
    </DinnerDetailBox> 
  );
};

export default DinnerFoods;