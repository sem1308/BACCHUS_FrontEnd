import React from "react";
import { Form } from "react-bootstrap";
import { foodType } from "../../configs";
import styled from "styled-components";
import {ContentBlock, Img, ImgBox, Pre} from '../Utils';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const DinnerDetailBox = styled.div`
    position: relative;
    width: 740px;
    margin: 0 auto;
    display: flex;
    flex-direction : column;
`;

const DinnerFoods = ({foodCounts,handleFoodCountChange}) => {
  return (
    <DinnerDetailBox>
      {foodType.map(type=>{
        return(
          <div key={type}>
            <Pre lh='40px' mt='10px' fs='20px' fw='600' width='200px'>
              <ImgBox width='100px'>
                <ContentBlock>{type}</ContentBlock>
                <Img width='30px' height='30px' src={'/imgs/foods/'+type+'.PNG'}/>                            
              </ImgBox>
            </Pre>
            <Row xs={4} md={2} className="g-4">
            {foodCounts.map(foodCount=>{
              if(foodCount.type !== type)return;
              return(          
                <Col key={foodCount.foodNum}>
                  <ContentBlock display='flex' padding='5px'>
                    <ContentBlock fs='14px' margin='0px 20px 0 0' width='30%'>{foodCount.foodName}</ContentBlock> 
                    <ContentBlock fs='14px' margin='0px 20px 0 0' width='25%'>{foodCount.price.toLocaleString()}원</ContentBlock> 
                    <ContentBlock width='25%'>
                      <Form.Control id={Number(foodCount.foodNum)} name="count" 
                      value={foodCount.count} onChange={handleFoodCountChange} placeholder="개수 입력" />
                    </ContentBlock>
                  </ContentBlock>
                </Col>
              )
            })}
            </Row>
            <hr style={{margin:'20px 0px'}}></hr>
          </div>
        )
      })}
    </DinnerDetailBox> 
  );
};

export default DinnerFoods;