import { useState } from 'react';
import useSpeechRecognition from 'react-speech-kit/dist/useSpeechRecognition';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import HearingIcon from '@mui/icons-material/Hearing';

const Audio = () => {
  const [value, setValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
      onResult: (result) => {
          setValue(result);
          stop();
      },
  });

  return(
    <div>
        <textarea
            value={value}
            disabled
        />
        <button onClick={()=>listen({ interimResults: false })}>
            <KeyboardVoiceOutlinedIcon></KeyboardVoiceOutlinedIcon>
        </button>
          {listening && <div><HearingIcon/>듣는중...</div>}
        </div>
  )
}

export default Audio;