import DinnerList from '../components/DinnerList';
import Header from '../components/Header';
import styled from 'styled-components';
import NavBar from '../components/NavBar';

const DinnerBlock = styled.div`
    position: relative;
    width: 1220px;
    padding-top: 130px;
    margin: 55px auto 0;
    display: flex;
    flex-direction: column;
    align-content: space-between;
`;

function Dinner () {
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

export default Dinner;