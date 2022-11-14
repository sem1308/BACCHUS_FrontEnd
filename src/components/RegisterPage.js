import { backEndUrl } from '../configs';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage({ type }) {
    const [Address, setAddress] = useState("");
    const [CardNum, setCardNum] = useState("");
    const [Name, setName] = useState("");
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const onAddressHandler = (event) => {
        setAddress(event.currentTarget.value);
    }
    const onCardNumHandler = (event) => {
        setCardNum(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
        }

        let body = {
            address: Address,
            cardNum: CardNum,
            id: Id,
            name: Name,
            pw: Password,
        }

        signupCustomer(body);
    }

    const signupCustomer = async (dataToSubmit) => {
        console.log(dataToSubmit);  // 확인
        await axios.post(backEndUrl + '/' + type + '/register', dataToSubmit)
            .then(response => {
                console.log(response); // 확인

                if (response.status === 200) {
                    alert('회원가입 되었습니다.');
                    navigate(`/login/${type}`);
                }
            })
            .catch(error => alert('이미 존재하는 회원입니다.'));
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Name</label>
                <input type='text' value={Name} onChange={onNameHandler} />
                <label>Address</label>
                <input type='text' value={Address} onChange={onAddressHandler} />
                <label>Card Number</label>
                <input type='password' value={CardNum} onChange={onCardNumHandler} />
                <label>Id</label>
                <input type='text' value={Id} onChange={onIdHandler} />
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button formAction=''>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default RegisterPage;