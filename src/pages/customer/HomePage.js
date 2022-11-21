import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { MenuOutlined } from '@mui/icons-material';
import { HomeBlock,LinkBlock } from '../../components/Utils';

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