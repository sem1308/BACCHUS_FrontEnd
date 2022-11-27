import { backEndUrl } from '../../configs';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { CustomerDiv, CustomerForm, CustomerHeader, CustomerInput, CustomerButton } from '../../components/Utils';
import styled from 'styled-components';
import Header from '../../components/Header';

const CustomerLabel = styled.label`
    font-weight: bold;
`;

function RegisterPage() {
    const [Address, setAddress] = useState(["",""]);
    const [CardNum, setCardNum] = useState("");
    const [Name, setName] = useState("");
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const onAddressHandler = (event) => {
        console.log(Address);
        setAddress(Address.map((add,i)=>(
            Number(event.target.id)===i ? event.target.value : add
        )))
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
        } else {
            let body = {
                address: Address.join(','),
                cardNum: CardNum,
                id: Id,
                name: Name,
                pw: Password,
            }

            console.log(body);
            signupCustomer(body);
        }
    }

    const signupCustomer = async (dataToSubmit) => {
        try {
            const response = await axios.post(backEndUrl + '/customer', dataToSubmit)
            console.log(response);
            alert('회원가입 되었습니다.');
            navigate(`/login/`);
        } catch (e) {
            alert(e.response.data.message);
            console.log(e);
        }
    }

    return (
        <CustomerDiv>
            <Header></Header>
            <CustomerForm onSubmit={onSubmitHandler}>
                <CustomerHeader>
                    <h3 style={{
                        marginTop: '0.8em',
                        textAlign: 'left',
                        fontWeight: 1000,
                    }}>회원가입</h3>
                </CustomerHeader>
                <div style={{
                    marginTop: '3em',
                    display: 'flex',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: '1.3em'
                    }}>
                        <CustomerLabel>이름</CustomerLabel>
                        <CustomerInput type='text' value={Name} onChange={onNameHandler} placeholder="1-10자로 입력해주세요." />
                        <CustomerLabel>주소</CustomerLabel>
                        <CustomerInput id='0' type='text' value={Address[0]} onChange={onAddressHandler} placeholder="건물명, 도로명, 지번" />
                        <CustomerInput id='1' type='text' mt='0px' value={Address[1]} onChange={onAddressHandler} placeholder="동, 호수 등" />
                        <CustomerLabel>카드번호</CustomerLabel>
                        <CustomerInput type='password' value={CardNum} onChange={onCardNumHandler} placeholder="16자를 입력해주세요." />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '1.3em',
                    }}>
                        <CustomerLabel>아이디</CustomerLabel>
                        <CustomerInput type='text' value={Id} onChange={onIdHandler} placeholder="1-10자로 입력해주세요." />
                        <CustomerLabel>비밀번호</CustomerLabel>
                        <CustomerInput type='password' value={Password} onChange={onPasswordHandler} placeholder="1-15자로 입력해주세요." />
                        <CustomerLabel>비밀번호 확인</CustomerLabel>
                        <CustomerInput type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder="1-15자로 입력해주세요." />
                    </div>
                </div>
                <br />
                <CustomerButton style={{
                    width: '100%',
                }}>회원가입</CustomerButton>
            </CustomerForm>
        </CustomerDiv>
    )
}

export default RegisterPage;