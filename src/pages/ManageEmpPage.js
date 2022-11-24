import Header from '../components/Header';
import { ContentBlock, DinnerBlock } from '../components/Utils';
import NavBar from '../components/NavBar';
import EmployeeList from '../components/EmployeeList';

function ManageEmpPage () {
    const links = [
        {
            'name':'회원가입 요청',
            'to' : '/manage/employee/0'
        },
        {
            'name':'전체 회원',
            'to' : '/manage/employee/1'
        }
    ]

    return (
        <ContentBlock>
            <Header type='employee'/>
            <DinnerBlock>
                <NavBar links={links}/>
                <EmployeeList/>
            </DinnerBlock>
        </ContentBlock>
    )
}

export default ManageEmpPage;