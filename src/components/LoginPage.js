
import { backEndUrl } from '../configs';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CustomerDiv, CustomerForm, CustomerLink, CustomerHeader, CustomerInput, CustomerButton } from './Utils';
import { parseToken } from "./Utils";



function LoginPage({ type }) {
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['token']);
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

        loginCustomer(body);
    }
    const loginCustomer = async (dataToSubmit) => {
        try {
            const response = await axios.post(backEndUrl + '/' + type + '/login', dataToSubmit)
            console.log(response);
            alert('로그인 되었습니다.');
            setCookie('token', response.data.data);  // 고객 쿠키 저장
            if (window.confirm("주문 내역을 보시겠습니까?")) {
                navigate(`/ordered_list/${parseToken(response.data.data).num}`);
            } else {
                navigate('/dinner');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <CustomerDiv>
            <CustomerForm onSubmit={onSubmitHandler}>
                <CustomerHeader>
                    <CustomerLink to={`/dinner`}>
                        돌아가기
                    </CustomerLink>
                    <h1 style={{
                        textAlign: 'center',
                        fontWeight: 1000,
                    }}>MR.DINNER</h1>
                </CustomerHeader>
                <CustomerInput type='id' value={Id} onChange={onIdHandler} placeholder="아이디" />
                <CustomerInput type='password' value={Password} onChange={onPasswordHandler} placeholder="비밀번호" />
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