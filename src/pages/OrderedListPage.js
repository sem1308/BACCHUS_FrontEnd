import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { GiMeat } from 'react-icons/gi';
import moment from 'moment';
import { backEndUrl } from '../configs';
import { parseToken } from "../components/Utils";
import Modal2 from '../components/Modal2';
import OrderedListModal from '../components/OrderedListModal';
import styled from 'styled-components'
import Header from "../components/Header";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

const OLP = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding : 100px 400px;
`;

const OLPHeader = styled.h1`
    font-weight: 1000;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
`;

const OLPForm = styled.div`
    margin-top:20px;
    height: 45em;
    overflow:auto;
    overflow-x: hidden
`;

const OLPContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5em;
    border: 1px solid #c0c0c0;
    margin-top: 1em;
    margin-bottom: 0.5em;
    height: 15em;
`;

const OLPTop = styled.div`
    display: flex;
    justify-content: space-between;
    color: grey;
`;

const OLPTopLeft = styled.div`
    display: flex;

`;

const OLPTopLeftTime = styled.div`
    margin-right: 0.1em;

`;

const OLPTopLeftState = styled.div`
    margin-left: 0.25em;

`;

const OLPTopRight = styled.div`
    margin-right: 0.1em;

`;

const OLPTopRightBtn = styled.button`
    border: 0.5px solid white;
    border-radius: 5%;
    color: white;
    background-color: #964b00;
    box-shadow: 3px 3px 3px #c0c0c0;
`;

const OLPMiddle = styled.div`
    display: flex;
    justify-content: center;
`;

const OLPMiddleTxt = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const OLPMIddleTxtMain = styled.div`
    width: 8em;
    font-weight: bold;
    font-size: 1.5em;
`;

const OLPMiddleTxtExtra = styled.div`
    margin-top: 1em;
    font-size: 0.6em;
`;

const OLPBottom = styled.div`
    display: flex;
    justify-content: center;
`;

const OLPReorderBtn = styled.button`
    border: 0.5px solid white;
    width: 20em;
    height: 4em;
    font-weight: bold;
    color: white;
    background-color: #964009;
    box-shadow: 3px 6px 3px #c0c0c0;
`;

const OrderedListPage = () => {
    // console.log("ORDERPAGE IS RENDERING...")
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cookies, ,] = useCookies(['token']);
    const navigate = useNavigate();
    const customerNum = parseToken(cookies.token).num;
    // const [hover, setHover] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVisibleId, setModalVisibleId] = useState("")

    // 재주문 버튼 클릭 시 이전 주문 정보 POST
    // 버튼 id를 주문 번호로 지정
    const submitHandler = (e) => {
        const registOrder = async () => {
            const index = user.orders.findIndex(element => element.orderNum === Number(e.target.id));

            await axios.post(
                backEndUrl + '/order', {
                foodCountDTOs: user.orders[index].foodCounts.map(fc => ({
                    foodNum: fc.food.foodNum,
                    count: fc.count
                })),
                insertOrderDTO: {
                    "dinnerNum": [user.orders[index].dinners[0].dinnerNum],
                    "customerNum": user.customerNum,
                    "totalPrice": user.orders[index].totalPrice,
                    "styleCode": user.orders[index].style.styleCode,
                    "wantedDeliveredTime": user.orders[index].wantedDeliveredTime,
                    "address": user.address,
                    "cardNum": user.cardNum
                }
            }).then(res =>
                Swal.fire({
                    title: '주문 완료',
                    text: res.data.text,
                    icon: 'success',
                    confirmButtonText: '확인'
                }).then((res) => {
                    fetchCustomers();
                    if (res.isConfirmed) {
                        navigate(`/ordered_list`);
                    }
                    else {
                    }
                })
            ).catch(error =>
                Swal.fire({
                    title: '주문 실패',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: '확인'
                })
            );
        };

        if (window.confirm("이전과 동일하게 주문하시겠습니까?")) {
            registOrder();
        }
    }

    const fetchCustomers = async () => {
        try {
            setError(null);
            setUser(null);
            setOrders(null);
            setLoading(true);
            const response = await axios.get(
                backEndUrl + `/customer/${customerNum}`
            );
            setUser(response.data);
            setOrders(response.data.orders.reverse());
            // console.log(response.data);
        } catch (e) {
            console.log(e); // 에러 출력
            setError(e);
        }
        setLoading(false);
    };

    const openModal = () => { setModalOpen(true) };
    const closeModal = () => { setModalOpen(false) };
    const onModalHandler = (id) => {
        setModalVisibleId(id)
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    // 주문내역 출력
    // console.log(orders);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!orders) return null;

    return (
        <OLP>
            <Header></Header>
            <OLPHeader>MR.{user.name}님의 주문목록</OLPHeader>
            <OLPForm>
                <Row xs={4} md={2} className="g-4">
                    {orders.map((order) => (
                    <Col>
                        <OLPContainer>
                            {/* header 부분 */}
                            <OLPTop>
                                <OLPTopLeft>                            
                                    <OLPTopLeftState>
                                        <pre>{
                                            order.state === 'DE' ?
                                                '배달완료 · '
                                                : order.state === 'DS' ?
                                                    '배송중'
                                                    : order.state === 'CE' ?
                                                        '조리완료'
                                                        : order.state === 'CS' ?
                                                            '조리시작'
                                                            : '주문확인중'
                                        }</pre>
                                    </OLPTopLeftState>
                                    <OLPTopLeftTime>
                                        <pre>{
                                            order.state === 'DE' ?
                                                moment(new Date(order.deliveredTime)).format("MM-DD HH:mm")
                                                : ''
                                        }</pre>
                                    </OLPTopLeftTime>
                                </OLPTopLeft>
                                <OLPTopRight>
                                    <OLPTopRightBtn onClick={() => onModalHandler(order.orderNum)}>주문상세</OLPTopRightBtn>
                                </OLPTopRight>
                                <Modal2 header={order.orderNum} id={order.orderNum} modalVisibleId={modalVisibleId}
                                    setModalVisibleId={setModalVisibleId}>
                                    <OrderedListModal order={order} />
                                </Modal2>
                            </OLPTop>
                            {/* body 부분 */}
                            <OLPMiddle>
                                <GiMeat size='7em' style={{
                                    border: '0.5px solid #c0c0c0',
                                    marginRight: '1em',
                                }} />
                                {order.orderDinners.map(orderDinner=>{
                                    console.log(orderDinner)
                                return(<OLPMiddleTxt key={orderDinner.dinner.dinnerNum}>
                                    <OLPMIddleTxtMain>{orderDinner.dinner.name}</OLPMIddleTxtMain>
                                    <OLPMiddleTxtExtra>{orderDinner.dinner.extraContent}</OLPMiddleTxtExtra>
                                </OLPMiddleTxt>)})}
                            </OLPMiddle>
                            {/* tail 부분 */}
                            <OLPBottom>
                                <OLPReorderBtn onClick={submitHandler} id={order.orderNum}>재주문 하기</OLPReorderBtn>
                            </OLPBottom>
                        </OLPContainer>
                    </Col>
                ))}
                </Row>
            </OLPForm>
        </OLP>
    );
}

export default OrderedListPage;