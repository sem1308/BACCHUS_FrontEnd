import React, { useState } from 'react';
import axios from 'axios';
import { backEndUrl } from '../configs';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Register from './register';
import { Navigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

function Login({ type }) {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const navigation = useNavigate();
    const [cookies, setCookie, ] = useCookies(['token']);

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
                const data = res.data.data;
                setCookie('token', data);
                console.log(data);
                if (type !== ''){
                    navigation(`/${type}`)
                }else{
                    if (window.confirm("주문 정보를 보시겠습니까?")) {
                        navigation(`/history`);
                    } else {
                        navigation(`/dinner`)
                    }
                }
            })
            .catch((error) => {
                alert(error.response.data.message);
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