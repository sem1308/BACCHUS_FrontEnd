import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { HomeBlock,LinkBlock } from '../../components/Utils';
import MonitorIcon from '@mui/icons-material/Monitor';
import Audio from '../../components/Audio/Audio';

function HomePage () {
    return (
        <div>
            <Header/>
            <HomeBlock>
                <LinkBlock>
                    <Link className='link' to="/dinner">
                        <MonitorIcon style={{ fontSize: '48px', marginRight:'12px'}}/>
                        화면 주문
                    </Link>
                </LinkBlock>
                <Audio/>
            </HomeBlock>
        </div>
    )
}

export default HomePage;