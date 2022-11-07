import Header from '../../components/Header';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {backEndUrl} from '../../configs';

const DinnerBlock = styled.div`
    position: relative;
    width: 1220px;
    padding-top: 130px;
    margin: 55px auto 0;
    display: flex;
    flex-direction: column;
    align-content: space-between;
`;

const DinnerDetailBlock = styled.div`
    margin: 0 auto;
    display: flex;
`;

const DinnerDetailBox = styled.div`
    position: relative;
    width: 1220px;
    margin: 0 auto;
    display: flex;
`;

const ImgBox = styled.img`
    position: relative;
    bottom:0px;
    width: 45%;
    height: 500px;
    margin-left : 30px;
    margin-right : 50px;
`;

const DetailTextBlock = styled.div`
    padding: 0px;
`;

const DetailTextBox = styled.pre`
    width: 500px;
    border-bottom: 1px solid ${props => props.color || '#fff'};
    margin-top : ${props => props.mt || '0px'};
    margin-left : ${props => props.ml || '0px'};
    margin-bottom : 0px;
    color: #4f382a;
    font-family: var(--bs-body-font-family);
    font-size: ${props => props.fs || '24px'};
    font-weight: ${props => props.fw || '400'};
    line-height: ${props => props.lh || '48px'}; 
    text-align: start;
`;

const FoodBox = styled.li`
    margin-bottom : 10px;
    list-style: ${props => props.ls || 'none'};
`;

function DinnerDetail () {
    const {dinnerNum} = useParams();
    const [dinner, setDinner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [basePrice, setBasePrice] = useState(0);
    //const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            // 요청이 시작 할 때에는 error 와 dinners 를 초기화하고
            setError(null);
            setDinner(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get(
              //'http://13.125.101.4:8080/dinner/'+dinnerNum
              backEndUrl+'/dinner/'+dinnerNum
            )
            setDinner(response.data); // 데이터는 response.data 안에 들어있습니다.
            response.data.foodCounts.map(foodCount=>setBasePrice(basePrice=>basePrice+foodCount.food.price*foodCount.count));
          } catch (e) {
            console.log(e)
            setError(e);
          }
          setLoading(false);
        };
        fetchUsers();
    }, [dinnerNum]);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!dinner) return null;

    return (
        <div>
            <Header></Header>
            <DinnerBlock>
                <NavBar></NavBar>
                <DinnerDetailBlock>
                    <DinnerDetailBox>
                        <ImgBox src={`/imgs/dinners/${dinner.name}.jpeg`}></ImgBox>
                        <DetailTextBlock>
                            <DetailTextBox color='#decdb9'>{dinner.name}</DetailTextBox>
                            <DetailTextBox lh='24px' mt='10px' fs='16px'>{dinner.extraContent}</DetailTextBox>
                            <DetailTextBox fs='20px' fw='600'>기본 구성</DetailTextBox>
                            {dinner.foodCounts.map(foodCount=>{
                                const food = foodCount.food;
                                const count = foodCount.count;
                                if(count === 0) return '';
                                return(
                                    <FoodBox key={food.foodNum} ls='inside'>
                                        {food.name} {count}개
                                    </FoodBox>
                                );
                            })}
                            <DetailTextBox mt='20px' fs='20px' fw='600'>기본 가격</DetailTextBox>
                            <DetailTextBox fs='20px' ml='5px'>{basePrice} 원</DetailTextBox>
                        </DetailTextBlock>
                    </DinnerDetailBox>
                    
                </DinnerDetailBlock>
            </DinnerBlock>
        </div>
    )
}

export default DinnerDetail;