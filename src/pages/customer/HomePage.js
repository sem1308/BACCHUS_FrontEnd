import Header from '../../components/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { TagFacesOutlined } from '@mui/icons-material';
import { MenuOutlined } from '@mui/icons-material';

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
    border-radius: 10%;
    border : rgba(158, 125, 90,0.5);
    margin: 55px auto 0;
    box-shadow : 0 0 10px 0px rgba(158, 125, 90,0.7);

    &:hover{
        color : black;
        box-shadow : 0 0 20px 0px rgba(158, 125, 90,1);
    }
`;

function HomePage () {
    return (
        <div>
            <Header/>
            <HomeBlock>
                <LinkBlock>
                    <Link className='link' to="/dinner">
                        <ShoppingCartOutlined style={{ fontSize: '48px', marginRight:'12px'}}/>
                        디너 주문
                    </Link>
                </LinkBlock>
                <LinkBlock>
                    <Link className='link' to={`/ordered_list`}>
                        <MenuOutlined style={{ fontSize: '48px', marginRight:'12px'}}/>
                        주문 목록
                    </Link>
                </LinkBlock>
            </HomeBlock>
        </div>
    )
}

export default HomePage;