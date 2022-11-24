import { css } from 'styled-components';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const nav_color = 'rgba(122, 76, 29,1)'

const NavBarBlock = styled.nav`
    display: block;
    position: relative;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 30px;
    text-align: center;
    -webkit-box-shadow: inset 0 -1px 0 ${nav_color};
    box-shadow: inset 0 -1px 0 ${nav_color};
`;

const NavBarListBox = styled.ul`
    display: inline;
    vertical-align: top;
    padding : 0px;
    margin : 0px;
`;

const NavBarContent = styled.li`
    float: left;
    border-left:2px solid #fff;
    &:first-child{  
        border-left:none;
    }
`;

const NavBarContentLink = styled.span`
    display: block;
    width: 130px;
    height: 50px;
    color: white;
    font-size: 15px;
    line-height: 48px;
    text-align: center;
    background : ${nav_color};
    border: 1px solid ${nav_color};
    border-left:none;
    border-radius: 15px 15px 0 0 / 15px 15px 0 0;
    
    ${(props) =>
        props.active ?
            css`
          color: #8B4513;
          font-weight: bold;
          border: 1px solid ${nav_color};
          border-radius: 15px 15px 0 0 / 15px 15px 0 0;
          box-shadow : 0 2px 0px 0px #fff;
          border-bottom:none;
          background : white;
        ` :
            css`
        &:hover{       
            font-size: 16px;
            line-height: 49px;
        }`
    }
`;

function NavBar({ links }) {
    useParams();
    const isActive = (path) => {
        return window.location.pathname === path;
    }

    return (
        <NavBarBlock>
            <NavBarListBox>
                {
                    links.map(link =>
                        <NavBarContent key={link.name}>
                            <NavBarContentLink active={isActive(link.to)}>
                                <Link className='nav-link' to={link.to}>{link.name}</Link>
                            </NavBarContentLink>
                        </NavBarContent>
                    )
                }
            </NavBarListBox>
        </NavBarBlock>
    )
}

NavBar.defaultProps = {
    links: [
        {
            'name': '메뉴',
            'to': '/dinner'
        }
    ]
}

export default NavBar;