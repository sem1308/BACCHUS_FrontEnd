
import { backEndUrl } from '../configs';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import React, { useState } from 'react';
import axios from 'axios';


function LoginPage({ type }) {
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['customerNum']);
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
        console.log(dataToSubmit);  // 확인
        await axios.post(backEndUrl + '/' + type + '/login', dataToSubmit)
            .then(response => {
                console.log(response); // 확인

                if (response.status === 200) {
                    alert('로그인 되었습니다.');
                    setCookie('customerNum', response.data.customerNum);  // 고객 쿠키 저장

                    if (window.confirm("주문 내역을 보시겠습니까?")) {
                        navigate(`/history/${response.data.customerNum}`);
                    } else {
                        navigate('/dinner');
                    }
                }
            })
            .catch(error => alert('없는 정보입니다.'));
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>ID</label>
                <input type='id' value={Id} onChange={onIdHandler} />
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    로그인
                </button>
            </form>

        </div>
    );
}

export default LoginPage;