
import { backEndUrl } from '../configs';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import React, { useState } from 'react';
import axios from 'axios';
import { CustomerDiv, CustomerForm, CustomerLink, CustomerHeader, CustomerInput, CustomerButton } from '../components/Utils';
import Header from '../components/Header';

function LoginPage({ type }) {
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['cusToken','empToken']);
    const navigate = useNavigate();

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // 새로고침 방지

        let body = {
            id: Id,
            pw: Password,
        }

        login(body);
    }
    const login = async (dataToSubmit) => {
        try {
            const response = await axios.post(backEndUrl + '/' + type + '/login', dataToSubmit)
            console.log(response);
            alert('로그인 되었습니다.');
            if (type === 'customer') {
                setCookie('cusToken', response.data.data);  // 고객 쿠키 저장
                if (window.confirm("주문 내역을 보시겠습니까?")) {
                    navigate(`/ordered_list`);
                } else {
                    navigate('/');
                }
            } else {
                setCookie('empToken', response.data.data);  // 직원 쿠키 저장
                navigate('/employee');
            }
        } catch (e) {
            alert(e.response.data.message);
            console.log(e);
        }
    }

    return (
        <CustomerDiv>
            <Header type={type === 'customer' ? '' : 'employee'}></Header>
            <CustomerForm onSubmit={onSubmitHandler}>
                <CustomerHeader>
                    <h1 style={{
                        textAlign: 'center',
                        fontWeight: 1000,
                        padding : '0 0 20px 0'
                    }}>MR.DINNER</h1>
                </CustomerHeader>
                <CustomerInput type='id' w='100%' value={Id} onChange={onIdHandler} placeholder="아이디" />
                <CustomerInput type='password' w='100%' value={Password} onChange={onPasswordHandler} placeholder="비밀번호" />
                <br />
                <CustomerButton>
                    로그인
                </CustomerButton>
                <p>혹시, MR.DINNER가 처음이신가요? &nbsp;&nbsp;&nbsp;
                    <CustomerLink to={`/register`} style={{
                        fontSize: '1em',
                    }}>
                        회원가입
                    </CustomerLink>
                </p>
            </CustomerForm>
        </CustomerDiv>
    );
}

export default LoginPage;