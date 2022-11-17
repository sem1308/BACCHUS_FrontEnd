import React from "react";
import styled from "styled-components";
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DatePicker } from 'antd';
import moment from 'moment';
import { ContentBlock, ModalBlock, ButtonBlock, Span, Pre } from '../Utils';
import { AddrForm, CardForm } from "../InfoForm";

const DummyIframe = styled.iframe`
  display : none;
`;

const OrderDinnerModal = (props) => {
  return (
    <ModalBlock height='auto' flex_direction='column' overflow='auto'>
      <DummyIframe name="dummy"></DummyIframe>
      <ContentBlock>
        <Pre text_align='center' padding='0 0 10px 0' mb='15px' color='rgba(139,69,19,0.2)'>{props.dinner.name}</Pre>
        <ContentBlock padding='10px 10px 0 10px'>
          {props.foodCounts.map(foodCount => {
            if (foodCount.count === 0) return;
            return (
              <ContentBlock width='auto' display='flex' flex_direction='row' key={Number(foodCount.foodNum)} className='mb-3'>
                <ContentBlock fs='16px' margin='0px 5px 0 0' width='30%'>{foodCount.name}</ContentBlock>
                <ContentBlock fs='16px' margin='0px 5px 0 0' width='15%'>{foodCount.count}개</ContentBlock>
                <ContentBlock fs='16px' margin='0px 5px 0 0' width='30%'>{(foodCount.price * foodCount.count).toLocaleString()}원</ContentBlock>
              </ContentBlock>
            )
          })}
        </ContentBlock>
        <Pre text_align='end' mt='30px' fw='600' fs='20px'>총 금액 : {props.totalPrice.toLocaleString()}원</Pre>
        <Pre mb='20px' color='black' fw='600' fs='22px'>결제</Pre>
        <Form noValidate validated={props.validated} onSubmit={props.submitHandler} target='dummy'>
          <Form.Group className="mb-3">
            <Form.Label>주소</Form.Label>
            <AddrForm address={props.orderInfo.address} handleChange={props.handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>카드 번호</Form.Label>
            <CardForm cardNum={props.orderInfo.cardNum} handleChange={props.handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicContent">
            <Form.Label className="d-block">배달 요청 시간 <Span fs='12px'>( 30분 뒤부터 가능합니다. )</Span></Form.Label>
            <DatePicker
              showNow={false}
              placement='topLeft'
              showTime={{
                format: 'HH:mm',
              }}
              disabledDate={(time) => props.initTime >= new Date(time).getTime()}
              defaultValue={moment(new Date(props.initTime), "MM-DD HH:mm")}
              onChange={(time) => props.setOrderInfo({
                ...props.orderInfo,
                wantedDeliveredTime: new Date(time),
              })}
              format="MM-DD HH:mm"
              minuteStep={5}
            />
          </Form.Group>
          <ButtonBlock>
            <Button variant="primary" type="submit">
              주문
            </Button>
          </ButtonBlock>
        </Form>
      </ContentBlock>
    </ModalBlock>
  );
};

export default OrderDinnerModal;