import Nav from 'react-bootstrap/Nav';
import { foodType } from '../configs';
import React, { useEffect } from 'react';
import { Img } from './Utils';

function FoodNavBar({setFoodCountsType}) {

  const onSelect = (key, e, defaluttype=null) => {
    let type = defaluttype;
    if(!defaluttype) type = e.target.name;
    setFoodCountsType(type);
  }

  useEffect(() => {
    onSelect('','',foodType[0]);
  }, []);  

  return (
    <Nav justify variant="tabs" className='mb-4' defaultActiveKey="link-1" onSelect={onSelect}>
        {foodType.map((type,i)=>
        <Nav.Item key={i}>
            <Nav.Link name={type} eventKey={"link-"+(i+1)}>
              {type} <Img name={type} height='30px' src={'/imgs/foods/'+type+'.PNG'}/>
            </Nav.Link>
        </Nav.Item>
        )}
    </Nav>
  );
}

export default FoodNavBar;