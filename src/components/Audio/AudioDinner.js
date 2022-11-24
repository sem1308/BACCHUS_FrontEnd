import React from 'react';
import { ContentBlock, Span, ImgBox, Img } from '../Utils';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { foodType } from '../../configs';

const AudioDinner = ({dinner}) => {
  let totalPrice = 0;
  return (
    <ContentBlock>
      <ContentBlock display='flex' justify_content='center' margin='5px 5px 5px 5px' fw='600' color='rgba(112, 53, 33,1)'>
        <RestaurantMenuOutlinedIcon style={{ fontSize: '30px', marginRight:'10px',color:'rgba(112, 53, 33,1)'}}/>
        <Span fs='20px'>{dinner.name}</Span>
        <RestaurantMenuOutlinedIcon style={{ fontSize: '30px', marginLeft:'10px',color:'rgba(112, 53, 33,1)'}}/>
      </ContentBlock>
      <ContentBlock margin='5px' padding='5px 5px 0 5px' fs='15px'>
        {dinner.extraContent}
      </ContentBlock>
      <ContentBlock className='mt-2' padding='10px 0' border='1px solid rgba(112, 53, 33,0.3)'
                    border_bottom='1px solid rgba(112, 53, 33,0.3)' border_radius='15px'>
        {foodType.map(type=>{
          return(
            <div key={type}>
              {dinner.foodCounts.map(foodCount=>{
                if(foodCount.food.type !== type || foodCount.count === 0)return;
                totalPrice += foodCount.food.price * foodCount.count;
                return(
                  <ContentBlock display='flex' padding='5px'>
                    <ImgBox height='10px'>
                      <Img width='20px' height='20px' src={'/imgs/foods/'+type+'.PNG'}/>
                    </ImgBox>
                    <ContentBlock fs='14px' margin='0px 10px 0 0' >{foodCount.food.name}</ContentBlock> 
                    <ContentBlock fs='14px' margin='0px 10px 0 0' >{foodCount.count}개</ContentBlock> 
                    <ContentBlock fs='14px' >{(foodCount.food.price*foodCount.count).toLocaleString()}원</ContentBlock> 
                  </ContentBlock>
                )
              })}
            </div>
          )
        })}
      </ContentBlock>
      <ContentBlock padding='10px'>
        <ContentBlock  fs='16px' >총 금액 : {(totalPrice).toLocaleString()}원</ContentBlock> 
        <ContentBlock text_align='end' fs='10px' >적정인원 : {dinner.numPeople}명</ContentBlock> 
      </ContentBlock>
    </ContentBlock>
  );
};

export default AudioDinner;