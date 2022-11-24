import { useState } from 'react';
import AudioModal from './AudioModal';
import { ContentBlock } from '../Utils';
import { LinkBlock } from '../Utils';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Modal from '../Modal';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Audio = () => {
  const navigate = useNavigate();
  const [cookies, , ] = useCookies(['token']);

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    if(cookies.token===undefined) 
      navigate('/login');
    else
      setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return(
    <ContentBlock>
      <LinkBlock onClick={openModal}>
        <div className='link'>
          <KeyboardVoiceIcon style={{ fontSize: '48px', marginRight:'12px'}}/>
          음성 주문
        </div>
      </LinkBlock>
      <Modal cls='audio' open={modalOpen} close={closeModal} header="음성 주문">
        <AudioModal setModalOpen={setModalOpen}></AudioModal>
      </Modal>
    </ContentBlock>
  )
}

export default Audio;