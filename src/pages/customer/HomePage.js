import Header from '../../components/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

function HomePage () {
    return (
        <div>
            <Header/>
            <HomeBlock>
                <LinkBlock>
                    <Link className='link' to="/dinner">디너 주문</Link>
                </LinkBlock>
                <LinkBlock>
                    <Link className='link' to={`/ordered_list`}>주문 목록</Link>
                </LinkBlock>
            </HomeBlock>
        </div>
    )
}

export default HomePage;