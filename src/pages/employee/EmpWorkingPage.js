import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { DinnerBlock } from '../../components/Utils';

function EmpWorkingPage ({which}) {
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

            </DinnerBlock>
        </div>
    )
}

EmpWorkingPage.defaultProps = {
    which: 'food'
}

export default EmpWorkingPage;