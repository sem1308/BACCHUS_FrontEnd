import { backEndUrl } from '../../configs';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { CustomerDiv, CustomerForm, CustomerHeader, CustomerInput, CustomerButton } from '../../components/Utils';
import styled from 'styled-components';
import Header from '../../components/Header';
import { Form } from 'react-bootstrap';

const CustomerLabel = styled.label`
    font-weight: bold;
`;

function EmpRegisterPage() {
    const [Name, setName] = useState("");
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [Occupation, setOccupation] = useState("CK");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onOccupationHandler = (event) => {
        setOccupation(event.currentTarget.value);
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
                id: Id,
                name: Name,
                pw: Password,
                occupation: Occupation,
            }

            console.log(body);
            signupEmployee(body);
        }
    }

    const signupEmployee = async (dataToSubmit) => {
        try {
            await axios.post(backEndUrl + '/employee', dataToSubmit)
            alert('회원가입 요청이 완료되었습니다.');
            navigate(`/login/employee`);
        } catch (e) {
            alert(e.response.data.message);
            console.log(e);
        }
    }

    return (
        <CustomerDiv>
            <Header type='employee'></Header>
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
                        <CustomerLabel>아이디</CustomerLabel>
                        <CustomerInput type='text' value={Id} onChange={onIdHandler} placeholder="1-10자로 입력해주세요." />
                        <CustomerLabel>비밀번호</CustomerLabel>
                        <CustomerInput type='password' value={Password} onChange={onPasswordHandler} placeholder="1-15자로 입력해주세요." />
                        <CustomerLabel>비밀번호 확인</CustomerLabel>
                        <CustomerInput type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder="1-15자로 입력해주세요." />
                        <CustomerLabel>직종</CustomerLabel>
                        <Form.Select value={Occupation} onChange={onOccupationHandler} aria-label="Default select example">
                            <option value='CK'>요리</option>
                            <option value='DM'>배달</option>
                        </Form.Select>
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

export default EmpRegisterPage;