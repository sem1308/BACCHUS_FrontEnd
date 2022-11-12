import { useParams } from 'react-router-dom';
import DinnerDetail from '../../components/dinner/DinnerDetail';

function DinnerDetailPage () {
    const {dinnerNum} = useParams();
    return (
        <DinnerDetail dinnerNum={dinnerNum}></DinnerDetail>
    )
}

export default DinnerDetailPage;