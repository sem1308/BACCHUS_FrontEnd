import styled from 'styled-components';
import {Link} from 'react-router-dom';

const NavBarBlock = styled.nav`
    display: block;
    position: relative;
    width: 1220px;
    margin: 0 auto;
    margin-bottom: 30px;
    text-align: center;
    -webkit-box-shadow: inset 0 -1px 0 #decdb9;
    box-shadow: inset 0 -1px 0 #decdb9;
`;

const NavBarListBox = styled.ul`
    display: inline;
    vertical-align: top;
    padding : 0px;
    margin : 0px;
`;

const NavBarContent = styled.li`
    float: left;
`;

const NavBarContentLink = styled.span`
    border-bottom-color: #fff;
    display: block;
    width: 130px;
    height: 50px;
    border: 1px solid #decdb9;
    color: #4f382a;
    font-size: 15px;
    line-height: 48px;
    text-align: center;

    &:hover{  
        color : #660000;     
    }
`;

function NavBar ({name}) {
    return (
        <NavBarBlock>
            <NavBarListBox>
                <NavBarContent>
                    <NavBarContentLink>
                        <Link className='nav-link' to='/dinner'>{name}</Link>
                    </NavBarContentLink>
                </NavBarContent>
            </NavBarListBox>
        </NavBarBlock>
    )
}

NavBar.defaultProps = {
    name: '메뉴'
  }

export default NavBar;