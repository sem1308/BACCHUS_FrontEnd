import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { HomeBlock, LinkBlock } from '../../components/Utils';

function EmpHomePage () {
    return (
        <div>
            <Header type='employee'/>
            <HomeBlock>
                <LinkBlock>
                    <Link className='link' to="/food/employee">음식 / 디너</Link>
                </LinkBlock>
                <LinkBlock>
                    <Link className='link' to="/working/employee/1">주문 관리</Link>
                </LinkBlock>
            </HomeBlock>
        </div>
    )
}

export default EmpHomePage;