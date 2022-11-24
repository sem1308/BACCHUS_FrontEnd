import React from 'react';
import { ContentBlock, Span } from '../Utils';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

const AudioMenu = ({dinners}) => {
  return (
    <ContentBlock>
      <ContentBlock display='flex' padding='5px 5px 10px 5px' fw='600' color='rgba(112, 53, 33,1)'>
        <MenuBookOutlinedIcon style={{ fontSize: '30px', marginRight:'10px',color:'rgba(112, 53, 33,1)'}}/> 
        <Span fs='20px' fw='600'>메뉴</Span>
      </ContentBlock>
      {dinners.map(dinner => 
        <ContentBlock padding='10px 5px' display='flex' key={dinner.dinnerNum}>
          <RestaurantIcon style={{ fontSize: '20px', marginRight:'10px', color:'rgba(112, 53, 13,0.8)'}}/> {dinner.name}
        </ContentBlock>
      )}
    </ContentBlock>
  );
};

export default AudioMenu;