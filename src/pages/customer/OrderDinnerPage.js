import { useParams } from 'react-router-dom';
import OrderDinner from '../../components/dinner/OrderDinner';

function OrderDinnerPage () {
    const {dinnerNum} = useParams();
    return (
        <OrderDinner dinnerNum={dinnerNum}></OrderDinner>
    )
}

export default OrderDinnerPage;