import DinnerList from '../../components/dinner/DinnerList';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { DinnerBlock } from '../../components/Utils';

function DinnerPage () {
    return (
        <div>
            <Header></Header>
            <DinnerBlock>
                <NavBar></NavBar>
                <DinnerList></DinnerList>
            </DinnerBlock>
        </div>
    )
}

export default DinnerPage;