import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { DinnerBlock } from '../../components/Utils';
import Working from '../../components/Working';

function EmpWorkingPage () {
    const links = [
        {
            'name':'배달 미완료',
            'to' : '/working/employee/1'
        },
        {
            'name':'배달 완료',
            'to' : '/working/employee/2'
        },        
        {
            'name':'전체 주문 목록',
            'to' : '/working/employee/0'
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