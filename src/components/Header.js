import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const HeaderBlock = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 102px;
    background: #fff;
    border-bottom: 1px solid #dbccbe;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
`;

const HeaderBox = styled.div`
    position: relative;
    width: 1220px;
    margin: 0 auto;
    text-align: center;
`;

const Logo = styled.h1`
    display: inline-block;
    margin-top: 7px;
    line-height: 0;
`;

const LogoBox = styled.a`
    display: inline-block;
`;

const LogoImgButton = styled.button`
    position: absolute;
    top: 25px;
    left: 0px;
    z-index: 300;
    border: 0;
    background: none;
`;

const LogoImgBox = styled.img`
    display: inline-block;
    width: 57px;
    height: 43px;
`;

const LogoTextImgBox = styled.img`
    display: inline-block;
    width: 245px;
    height: 83px;
`;

const LogoTextBox = styled.span`
    overflow: hidden !important;
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    margin: -1px !important;
    padding: 0 !important;
    border: 0 !important;
    white-space: nowrap !important;
    clip: rect(0, 0, 0, 0) !important;
    -webkit-clip-path: inset(0 0 99.9% 99.9%) !important;
    clip-path: inset(0 0 99.9% 99.9%) !important;
`;

const Utils = styled.div`
    position: absolute;
    top: 35px;
    right: 0;
`;

const UtilsListBox = styled.ul`
    list-style: none;
`;

const UtilsText = styled.li`
    text-decoration: none;
    border-radius: 10%;
`;

function Header({ type }) {
    const [cookies, setCookie, removeCookie] = useCookies(['customerNum']);

    return (
        <HeaderBlock>
            <HeaderBox>
                <Link to="/dinner">
                    <Logo>
                        <LogoBox>
                            <LogoTextImgBox src='/logos/logo_img.PNG'></LogoTextImgBox>
                            <LogoTextBox>"Mr. Dinner"</LogoTextBox>
                        </LogoBox>
                        <LogoImgButton>
                            <LogoImgBox src='/logos/logo.PNG'></LogoImgBox>
                        </LogoImgButton>
                    </Logo>
                </Link>
                <Utils>
                    <UtilsListBox>
                        <UtilsText>
                            {
                                cookies.customerNum === undefined ?
                                    <Link className='nav-link' to={"/login/" + type}>로그인 / 회원가입</Link>
                                    : <button onClick={() => {
                                        console.log(cookies);
                                        removeCookie('customerNum');
                                        console.log(cookies);
                                    }}>로그아웃</button>
                            }
                        </UtilsText>
                    </UtilsListBox>
                </Utils>
            </HeaderBox>
        </HeaderBlock>
    );
}

Header.defaultProps = {
    type: ''
}

export default Header;