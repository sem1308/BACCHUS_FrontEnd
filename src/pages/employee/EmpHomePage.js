import Header from '../../components/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const HomeBlock = styled.div`
    width: 1220px;
    padding-top: 230px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-content: space-between;
`;

const LinkBlock = styled.div`
    position: relative;
    text-decoration: none;
    color : black;
    cursor: pointer;
    width: 500px;
    height : 500px;
    font-size: 40px;
    background-color: rgba(227,214,165,0.8);
    border-radius: 10%;
    margin: 55px auto 0;

    &:hover{
        color : black;
        background-color: rgba(227,214,165,1);
    }
`;

function EmpHomePage () {
    const navigation = useNavigate();
    
    const [cookies, , ] = useCookies(['token']);

    const checkLogin = () => {
        return cookies.token === undefined;
      }

    useEffect(()=>{
        if(checkLogin()){
            navigation('/login/employee');
        }
    })

    return (
        <div>
            <Header type='employee'/>
            <HomeBlock>
                <LinkBlock>
                    <Link className='link' to="/food/employee">Food / Dinner</Link>
                </LinkBlock>
                <LinkBlock>
                    <Link className='link' to="/working/employee">Working</Link>
                </LinkBlock>
            </HomeBlock>
        </div>
    )
}

export default EmpHomePage;