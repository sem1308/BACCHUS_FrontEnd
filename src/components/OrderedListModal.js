import React from "react";
import styled from "styled-components";
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DatePicker } from 'antd';
import moment from 'moment';
import { ContentBlock, ModalBlock, ButtonBlock, Span, Pre } from './Utils';
import { AddrForm, CardForm } from "./InfoForm";

const DummyIframe = styled.iframe`
  display : none;
`;

const OrderedListModal = (order) => {
    /* 테스트 */
    console.log('OLMODAL RENDERING...')
    console.log(order.order);

    const orderDetail = order.order;
    const dinnerDetail = orderDetail.dinners[0];

    console.log(orderDetail.dinners[0]);

    return (
        <ModalBlock height='auto' flex_direction='column' overflow='auto'>
            <DummyIframe name="dummy"></DummyIframe>
            <ContentBlock>
                <Pre text_align='center' padding='0 0 10px 0' mb='15px' color='rgba(139,69,19,0.2)'>{dinnerDetail.name}</Pre>
                <ContentBlock padding='10px 10px 0 10px'>
                    {dinnerDetail.foodCounts.map(foodCount => {
                        if (foodCount.count === 0) return;
                        return (
                            <ContentBlock width='auto' display='flex' flex_direction='row' key={Number(foodCount.food.foodNum)} className='mb-3'>
                                <ContentBlock fs='16px' margin='0px 5px 0 0' width='30%'>{foodCount.food.name}</ContentBlock>
                                <ContentBlock fs='16px' margin='0px 5px 0 0' width='15%'>{foodCount.count}개</ContentBlock>
                                <ContentBlock fs='16px' margin='0px 5px 0 0' width='30%'>{(foodCount.food.price * foodCount.count).toString()}원</ContentBlock>
                            </ContentBlock>
                        )
                    })}
                </ContentBlock>
                <Pre text_align='end' mt='30px' fw='600' fs='20px'>총 금액 : {orderDetail.totalPrice.toString()}원</Pre>
            </ContentBlock>
        </ModalBlock>
    );
};

export default OrderedListModal;