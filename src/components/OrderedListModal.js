import React from "react";
import styled from "styled-components";
import { ContentBlock, ModalBlock,  Pre } from './Utils';

const DummyIframe = styled.iframe`
  display : none;
`;

const OrderedListModal = ({order}) => {
    /* 테스트 */
    // console.log('OLMODAL RENDERING...')
    console.log(order);

    const orderDetail = order;
    const orderDinnerDetail = orderDetail.orderDinners

    // console.log(orderDetail.dinners[0]);

    return (
        <ModalBlock height='auto' flex_direction='column' overflow='auto'>
            <DummyIframe name="dummy"></DummyIframe>
            <ContentBlock>                
                    {orderDinnerDetail.map(orderDinner=>
                        <div>
                        <Pre text_align='center' padding='0 0 10px 0' mb='15px' color='rgba(139,69,19,0.2)'>{orderDinner.dinner.name}</Pre>
                        <ContentBlock padding='10px 10px 0 10px'>
                            {orderDinner.foodCounts.map(foodCount => {
                                if (foodCount.count === 0) return;
                                return (
                                    <ContentBlock width='auto' display='flex' flex_direction='row' key={Number(foodCount.food.foodNum)} className='mb-3'>
                                        <ContentBlock fs='16px' margin='0px 5px 0 0' width='30%'>{foodCount.foodName}</ContentBlock>
                                        <ContentBlock fs='16px' margin='0px 5px 0 0' width='15%'>{foodCount.count}개</ContentBlock>
                                        <ContentBlock fs='16px' margin='0px 5px 0 0' width='30%'>{(foodCount.price * foodCount.count).toLocaleString()}원</ContentBlock>
                                    </ContentBlock>
                                )
                            })}
                            <ContentBlock width='auto' display='flex' flex_direction='row' className='mb-3'>
                                <ContentBlock fs='16px' margin='0px 5px 0 0' width='30%'>스타일</ContentBlock>
                                <ContentBlock fs='16px' margin='0px 5px 0 0' width='15%'>{orderDinner.style.name}</ContentBlock>
                                <ContentBlock fs='16px' margin='0px 5px 0 0' width='30%'>{orderDinner.style.price.toLocaleString()}원</ContentBlock>
                            </ContentBlock>
                        </ContentBlock>
                        </div>
                    )}
                <Pre text_align='end' mt='30px' fw='600' fs='20px'>총 금액 : {orderDetail.totalPrice.toLocaleString()}원</Pre>
            </ContentBlock>
        </ModalBlock>
    );
};

export default OrderedListModal;