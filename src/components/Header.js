import React from 'react';
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
    width: 950px;
    margin: 0 auto;
    text-align: center;
`;

const Logo = styled.h1`
    display: inline-block;
    margin-top: 7px;
    line-height: 0;
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

const UserButton = styled.button`
    margin-left: 5px;
    margin-right: 5px;
    border: solid 2px #8B4513;
    border-radius: 12px;
    color: #8B4513;
    font-weight: bold;
    box-shadow : 0 2px 1px 0 #fff;
    background-color: transparent;
`;

const UtilsListBox = styled.ul`
    list-style: none;
`;

const UtilsText = styled.li`
    text-decoration: none;
    border-radius: 10%;
`;

function Header({ type }) {
    const [cookies, , removeCookie] = useCookies(['token']);

    return (
        <HeaderBlock>
            <HeaderBox>
                <Logo>
                    <Link to={"/" + type}>
                        <LogoTextImgBox src='/logos/logo_img.PNG'></LogoTextImgBox>
                        <LogoTextBox>"Mr. Dinner"</LogoTextBox>
                    </Link>
                    <Link className='img-button' to={"/" + type}>
                        <LogoImgBox src='/logos/logo.PNG'></LogoImgBox>
                    </Link>
                </Logo>
                <Utils>
                    <UtilsListBox>
                        <UtilsText>
                            {
                                cookies.token === undefined ?
                                    <div>
                                        <Link to={"/login/" + type}>
                                            <UserButton>로그인</UserButton>
                                        </Link>
                                        <Link to={'/register/' + type}>
                                            <UserButton>회원가입</UserButton>
                                        </Link>
                                    </div>
                                    :
                                    <div>
                                        {
                                            type === '' ?
                                                <Link to={`/ordered_list`}>
                                                    <UserButton>주문내역 조회</UserButton>
                                                </Link>
                                                :
                                                ''
                                        }
                                        <UserButton onClick={() => {
                                            removeCookie('token', { path: '/' });  // 로그인 했을 때 등록했던 쿠키 해제
                                            alert('로그아웃 되었습니다.');
                                        }}>로그아웃</UserButton>
                                    </div>
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