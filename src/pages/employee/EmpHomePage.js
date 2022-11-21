import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { HomeBlock, LinkBlock } from '../../components/Utils';

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