import DinnerList from '../../components/DinnerList';
import FoodList from '../../components/employee/FoodList';
import Header from '../../components/Header';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';

const DinnerBlock = styled.div`
    position: relative;
    width: 1220px;
    padding-top: 130px;
    margin: 55px auto 0;
    display: flex;
    flex-direction: column;
    align-content: space-between;
`;

function EmpManage ({which}) {
    const links = [
        {
            'name':'음식',
            'to' : '/food/employee'
        },
        {
            'name':'디너',
            'to' : '/dinner/employee'
        },
    ]

    return (
        <div>
            <Header></Header>
            <DinnerBlock>
                <NavBar links={links}></NavBar>
                {which === 'food' ? 
                    <FoodList></FoodList>
                    :
                    <DinnerList IsEmployee={true}></DinnerList>
                }
            </DinnerBlock>
        </div>
    )
}

EmpManage.defaultProps = {
    which: 'food'
}

export default EmpManage;