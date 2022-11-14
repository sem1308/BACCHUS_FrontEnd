import React, { useState } from 'react';
import axios from 'axios';
import { backEndUrl } from '../configs';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Register from './register';
import { Cookies, useCookies } from "react-cookie";
import { string } from 'yup';

function Login({ type }) {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const navigation = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['customerNum']);

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    // login 버튼 클릭 이벤트
    const onClickLogin = async () => {
        await axios.post(backEndUrl + '/' + type + '/login', {
            "id": inputId,
            "pw": inputPw
        })
            .then((res) => {
                console.log(res);
                // 주문내역 페이지로의 이동여부 결정
                if (res.status === 200) {
                    setCookie('customerNum', res.data.customerNum);
                    if (window.confirm("주문 정보를 보시겠습니까?")) {
                        navigation(`/history/${res.data.customerNum}`);
                    } else {
                        navigation(`/dinner`)
                    }
                } else {
                    console.log("없는 정보입니다.");
                }
            })
            .catch((error) => {
                alert("Error");
            })
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
                <Link to={`/login/register`} element={<Register />}>
                    <button type='button' onClick={() => { alert('회원가입 페이지로 이동하겠습니다.') }}>Signin</button>
                </Link>
            </div>
        </div>
    )
}

export default Login;