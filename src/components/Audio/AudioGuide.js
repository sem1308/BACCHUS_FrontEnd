import React from 'react';
import { ContentBlock, Span } from '../Utils';
import CampaignIcon from '@mui/icons-material/Campaign';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const explain = [
  ['메뉴', '등록된 메뉴들을 보여줍니다.'],
  ['... 디너', '특정 디너의 구성을 보여줍니다.'],
  ['... 디너 주문', '디너 주문 화면을 보여줍니다.']
]

const AudioGuide = ({color}) => {
  return (
    <ContentBlock width='350px' padding='5px' color={color}>
      <Span fs='18px' fw='600' > 음성 주문 가이드 </Span>
      <hr/>
      {explain.map((ex,i)=>
        <ContentBlock key={i} fs='14px' margin='0 0 10px 0' color={color}>
          <CampaignIcon style={{ fontSize: '20px', marginBottom:'3px', marginRight:'5px'}}/> {ex[0]} 
          <PlayArrowIcon style={{ fontSize: '20px', paddingBottom:'3px', marginRight:'5px', marginLeft:'10px'}}/> {ex[1]}    
        </ContentBlock>
      )}
    </ContentBlock>
  );
};

export default AudioGuide;