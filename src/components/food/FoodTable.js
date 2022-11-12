import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import {Img, ImgBox, Btn } from '../Utils';

const TH = styled.th`
  margin : auto;
`
const TD = styled.td`
  padding : 10px;
`

const FoodTable = ({foods, openModal}) => {

  return(
    <Table responsive="lg">
      <thead>
        <tr>
          <TH>종류</TH>
          <TH>이름</TH>
          <TH>가격</TH>
          <TH>수량</TH>
          <TH width='100px'></TH>
        </tr>
      </thead>
      {foods.map(food => (
        <tr>
          <td><ImgBox><Img height='30px' src={'/imgs/foods/'+food.type+'.PNG'}/></ImgBox></td>
          <TD>{food.name}</TD>
          <TD>{food.price}</TD>
          <TD>{food.stock}</TD>
          <Btn onClick={()=>openModal(food)}>수정</Btn>
        </tr>
      ))}
    </Table>
  )
}

export default FoodTable;