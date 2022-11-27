import React from 'react';
import { useState, useEffect } from 'react';
import useSpeechRecognition from 'react-speech-kit/dist/useSpeechRecognition';
import { ModalBlock, ContentBlock, Span} from '../Utils';
import MicIcon from '@mui/icons-material/Mic';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { backEndUrl } from '../../configs';
import Fab from '@mui/material/Fab';
import AudioMenu from './AudioMenu';
import AudioDinner from './AudioDinner';
import AudioGuide from './AudioGuide';
import AudioOrder from './AudioOrder';

const AudioModal = ({setModalOpen}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [chats, setChats] = useState([['MDDS',<AudioGuide color='rgba(112, 53, 33,1)'/>]]);
  const [dinners, setDinners] = useState(null);

  const fetchDinners = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 dinners 를 초기화하고
      setError(null);
      setLoading(true);
      setDinners(null);
      await axios.get(
        backEndUrl+'/dinner'
      ).then(response=>
        setDinners(response.data.filter(dinner=>dinner.state==='SA')) // 데이터는 response.data 안에 들어있습니다.
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

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      console.log("듣고 있습니다!");
      if(result.includes('메뉴')){
        setChats([
          ...chats,
          ['USER',result],
          ['MDDS',<AudioMenu dinners={dinners}/>]
        ])
      }else if(result.includes('디너 주문')){
        const dinnerName = result.match(/([ㄱ-ㅎ|ㅏ-ㅣ|가-힣| ])*디너/i)[0];
        const dinner = dinners.filter((dinner)=>dinner.name === dinnerName)[0];
        setChats([
          ...chats,
          ['USER',result],
          ['MDDS', dinner !== undefined ? <AudioOrder dinner={dinner} setModalOpen={setModalOpen}/> : '해당 디너가 메뉴에 없습니다.']
        ])
      }else if(result.includes('디너')){
        const dinnerName = result.match(/([ㄱ-ㅎ|ㅏ-ㅣ|가-힣| ])*디너/i)[0];
        const dinner = dinners.filter((dinner)=>dinner.name === dinnerName)[0];
        setChats([
          ...chats,
          ['USER',result],
          ['MDDS', dinner !== undefined ? <AudioDinner dinner={dinner}/> : '해당 디너가 메뉴에 없습니다.']
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

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!dinners) return null;

  console.log(listening);

  return (
    <ModalBlock height='800px' flex_direction='column' overflow='auto'>
    <ContentBlock position='absolute' left='715px' top='10px'>   
      <Fab style={{width: '40px',height: '40px'}} onClick={()=>setModalOpen(false)} color="error" aria-label="add">
        <ClearIcon style={{ fontSize: '24px'}}/>
      </Fab>
    </ContentBlock>
      <ContentBlock>
        <ContentBlock padding='30px' overflow='auto' border_radius='5%' height='670px' 
                      border='1px solid #D3D3D3' border_bottom='1px solid #D3D3D3'
                      box_shadow='0 0 5px 0 #D3D3D3'>
          {chats.map((chat,i)=>
            <ContentBlock key={i} margin='0 0 30px 0' display='flex' 
                          justify_content={chat[0]==='USER' ? 'right' : 'left'}>
              <Span border='1px solid #D3D3D3'
                    border_bottom='1px solid #D3D3D3'
                    border_radius='10px'
                    padding='10px'
                    box_shadow='0 0 5px 0 #D3D3D3'>{chat[1]}</Span>
            </ContentBlock>  
          )}
        </ContentBlock>
        <ContentBlock position='absolute' left='680px' top='710px'>       
          <Tooltip
            placement="right-start" 
            title={<AudioGuide color='white'/>}>
            <Fab style={{border:'1px solid rgba(112, 53, 33,0.3)', backgroundColor: listening ? 'rgba(112, 53, 33,0.7)' : 'rgba(220, 220, 220,0.1)'}} 
                  onClick={()=>listen({ interimResults: false })} aria-label="add">
              <MicIcon style={{ fontSize: '32px', color: listening ? 'white' : 'rgba(112, 53, 33,0.7)'}}/>
            </Fab>
          </Tooltip>
          {listening && 
            <ContentBlock width='60px' position='absolute' left='2px' top='-30px'>
              듣는중
            </ContentBlock>}
        </ContentBlock>
      </ContentBlock>
    </ModalBlock>
  );
};

export default AudioModal;