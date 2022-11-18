import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { DinnerBlock } from '../../components/Utils';
import Working from '../../components/Working';

function EmpWorkingPage () {
    const links = [
        {
            'name':'주문 목록',
            'to' : '/working/employee'
        }
    ]

    return (
        <div>
            <Header type="employee"/>
            <DinnerBlock>
                <NavBar links={links}/>
                <Working/>
            </DinnerBlock>
        </div>
    )
}

EmpWorkingPage.defaultProps = {
    which: 'food'
}

export default EmpWorkingPage;