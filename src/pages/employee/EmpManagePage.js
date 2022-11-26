import DinnerList from '../../components/dinner/DinnerList';
import FoodList from '../../components/food/FoodList';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { DinnerBlock } from '../../components/Utils';

function EmpManagePage ({which}) {
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
            <Header type='employee'/>
            <DinnerBlock>
                <NavBar links={links}></NavBar>
                {which === 'food' ? 
                    <FoodList></FoodList>
                    :
                    <DinnerList type='employee'></DinnerList>
                }
            </DinnerBlock>
        </div>
    )
}

EmpManagePage.defaultProps = {
    which: 'food'
}

export default EmpManagePage;