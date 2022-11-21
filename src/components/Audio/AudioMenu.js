import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { backEndUrl } from '../../configs';
import { ContentBlock } from '../Utils';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const AudioMenu = () => {
  const [dinners, setDinners] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDinners = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 dinners 를 초기화하고
      setError(null);
      setDinners(null);
      await axios.get(
        backEndUrl+'/dinner'
      ).then(response=>
        setDinners(response.data) // 데이터는 response.data 안에 들어있습니다.
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

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!dinners) return null;
  return (
    <ContentBlock>
      {dinners.map(dinner => {
          const state = dinner.state;
          if(state==='SNA') return;
          return <ContentBlock display='flex' key={dinner.dinnerNum}>
            <RestaurantIcon/> {dinner.name}
          </ContentBlock>
          }
        )}
    </ContentBlock>
  );
};

export default AudioMenu;