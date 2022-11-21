import React from 'react';
import { useState } from 'react';
import useSpeechRecognition from 'react-speech-kit/dist/useSpeechRecognition';
import { ModalBlock, ContentBlock} from '../Utils';
import CampaignIcon from '@mui/icons-material/Campaign';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MicIcon from '@mui/icons-material/Mic';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import { Span } from '../Utils';
import Fab from '@mui/material/Fab';
import AudioMenu from './AudioMenu';

const explain = [
  ['메뉴 보기', '등록된 메뉴들을 보여줍니다.'],
  ['... 디너 보기', '특정 디너의 구성을 보여줍니다.'],
  ['... 디너 주문하기', '디너가 주문됩니다.']
]

const AudioModal = ({setModalOpen}) => {
  const [chats, setChats] = useState([]);
  const [value, setValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
      onResult: (result) => {
          setValue(result);
          if(result.includes('메뉴 보기')){
            setChats([
              ...chats,
              ['USER',result],
              ['MDDS',<AudioMenu/>]
            ])
          }else if(result.includes('창 닫기')){
            setModalOpen(false);
          }else{
            setChats([
              ...chats,
              ['USER',result],
              ['MDDS','말을 못 알아듣겠어요 ㅠㅠ']
            ])
          }
          stop();
      },
  });

  return (
    <ModalBlock height='800px' flex_direction='column' overflow='auto'>
    <ContentBlock position='absolute' left='715px' top='10px'>   
      <Fab style={{width: '40px',height: '40px'}} onClick={()=>setModalOpen(false)} color="error" aria-label="add">
        <ClearIcon style={{ fontSize: '24px'}}/>
      </Fab>
    </ContentBlock>
      <ContentBlock>
        <ContentBlock padding='30px' overflow='auto' border_radius='5%' height='690px' 
                  border='1px solid #D3D3D3' border_bottom='1px solid #D3D3D3'
                  box_shadow='0 0 5px 0 #D3D3D3'>
          {chats.map(chat=>
            <ContentBlock margin='0 0 10px 0' display='flex' 
                          justify_content={chat[0]==='USER' ? 'right' : 'left'}>
              <Span border='1px solid #D3D3D3'
                    border_bottom='1px solid #D3D3D3'>{chat[1]}</Span>
            </ContentBlock>  
          )}
        </ContentBlock>
        <ContentBlock position='absolute' left='480px' top='723px'>
          <input value={value}></input>
        </ContentBlock>
        <ContentBlock position='absolute' left='680px' top='710px'>       
          <Tooltip
            placement="right-start" 
            title={
            <ContentBlock width='360px' padding='5px' color='white'>
              <Span fs='16px' > 음성 주문 가이드 </Span>
              <hr/>
              {explain.map((ex)=>
                <ContentBlock fs='14px' margin='0 0 10px 0' color='white'>
                  <CampaignIcon style={{ fontSize: '20px', marginBottom:'3px', marginRight:'5px'}}/> {ex[0]} 
                  <PlayArrowIcon style={{ fontSize: '20px', paddingBottom:'3px', marginRight:'5px', marginLeft:'2px'}}/> {ex[1]}    
                </ContentBlock>
              )}
            </ContentBlock>
          }>
            <Fab onClick={()=>listen({ interimResults: false })} color="inherit" aria-label="add">
              <MicIcon style={{ fontSize: '32px'}}/>
            </Fab>
          </Tooltip>
        </ContentBlock>
        {listening && <ContentBlock width='60px' position='absolute' left='683px' top='680px'>
          듣는중
        </ContentBlock>}
      </ContentBlock>
    </ModalBlock>
  );
};

export default AudioModal;