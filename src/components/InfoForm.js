import React from "react";
import { ContentBlock } from "./Utils";
import { Form } from "react-bootstrap";

export const CardForm = ({cardNum,handleChange}) => {
  return (
    <ContentBlock display='flex'>
      {cardNum.map((card,i)=>{
        const hypoon = i!== 3 ? ' - ' : ''
        return(
          <>
            <Form.Control required maxLength={4} pattern='[0-9]{4}' id={String(i)} className="text-center" name="cardNum" 
                          value={card} onChange={handleChange} placeholder="0000"/>
            <ContentBlock padding='0 5px'>{hypoon}</ContentBlock>
          </>
        )}
      )}
    </ContentBlock>
  );
};

export const AddrForm = ({address,handleChange}) => {
  return (
    <>
      <Form.Control className='mb-2' id={0} required name="address" value={address[0]} onChange={handleChange} placeholder="주소 입력 (건물명, 도로명, 지번)" />
      <Form.Control id={1} required name="address" value={address[1]} onChange={handleChange} placeholder="상세 주소 입력 (동, 호수 등)" />
    </>
  );
};