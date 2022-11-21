import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import {Img, ImgBox, Btn } from '../Utils';
import { foodType } from '../../configs';

const TH = styled.th`
  margin : auto;
`
const TD = styled.td`
  padding : 10px;
`

const FoodTable = ({foods, openModal}) => {
  const stateToWord = {
    "SA" : "판매중" ,
    "SNA" : "판매 중지"
  };

  let beforeType;

  return(
    <Table responsive="lg">
      <thead>
        <tr>
          <TH>종류</TH>
          <TH>이름</TH>
          <TH>가격</TH>
          <TH>수량</TH>
          <TH>상태</TH>
          <TH width='100px'></TH>
        </tr>
      </thead>
      {foods.map((food,i) => {
        let isChange = false;
        if(i!=0 && beforeType != food.type) isChange = true;
        beforeType = food.type;
        return <tr className={isChange && 'horizon'} key = {food.foodNum} style={food.state==='SA' ? {opacity:1} : {opacity:0.5} }>
          <td><ImgBox><Img height='30px' src={'/imgs/foods/'+food.type+'.PNG'}/></ImgBox></td>
          <TD>{food.name}</TD>
          <TD>{food.price}</TD>
          <TD>{food.stock}</TD>
          <TD>{stateToWord[food.state]}</TD>
          <Btn onClick={()=>openModal(food)}>수정</Btn>
        </tr>
      })}
    </Table>
  )
}

export default FoodTable;