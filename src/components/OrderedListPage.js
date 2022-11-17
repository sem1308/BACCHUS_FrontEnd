import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { backEndUrl } from '../configs';
import { parseToken } from "./Utils";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { GiMeat } from 'react-icons/gi';
import Modal2 from './Modal2';
import OrderedListModal from './OrderedListModal';

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
    const onModalHandler = id => {
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
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",

            width: '100%',
            height: "100vh",
        }}>
            <Link style={{
                color: '#964b00',

                marginTop: '1em',
                marginRight: '26em',

                textDecoration: 'none',

                // ...(hover ? {
                //     color: '#bc5e00',
                // } : null)
            }}
                to="/dinner"
            // onMouseEnter={() => {
            //     setHover(true);
            // }}
            // onMouseLeave={() => {
            //     setHover(false);
            // }}
            >돌아가기
            </Link>
            <h1 style={{
                fontWeight: 1000,

                marginTop: '0.1em',
            }}>MR.{user.name}님의 주문목록</h1>
            <div style={{
                height: '45em',

                overflow: 'auto',
            }}>
                {orders.map((order) => (
                    // 한 컨테이너
                    <container style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '0.5em',

                        border: '1px solid #c0c0c0',
                        marginTop: '0.5em',
                        marginBottom: '0.5em',

                        width: '30em',
                        height: '15em',
                    }}>
                        {/* header 부분 */}
                        <wrapper className='header' style={{
                            display: 'flex',
                            justifyContent: 'space-between',

                            color: 'grey',
                        }}>
                            <wrapper className='header-left' style={{
                                display: 'flex',
                            }}>
                                <div style={{
                                    marginRight: '0.1em',
                                }}>
                                    <p>{`${order.deliveredTime} · `}</p>
                                </div>
                                <div style={{
                                    marginLeft: '0.25em',
                                }}>
                                    <p>{order.state ?
                                        '배달 완료'
                                        : '배달 중'
                                    }</p>
                                </div>
                            </wrapper>
                            <div className='header-right' style={{
                                marginRight: '0.1em',
                            }}>
                                <button style={{
                                    border: '0.5px solid white',
                                    borderRadius: '5%',

                                    color: 'white',
                                    backgroundColor: '#964b00',

                                    boxShadow: '3px 3px 3px #c0c0c0',

                                    // ...(hover ? {
                                    //     backgroundColor: '#bc5e00',
                                    // } : null)
                                }}
                                    // onMouseEnter={() => {
                                    //     setHover(true);
                                    // }}
                                    // onMouseLeave={() => {
                                    //     setHover(false);
                                    // }}
                                    onClick={() => onModalHandler(order.orderNum)}
                                // onClick={openModal}
                                >
                                    주문상세
                                </button>
                                <Modal2 header={order.orderNum} id={order.orderNum} modalVisibleId={modalVisibleId}
                                    setModalVisibleId={setModalVisibleId}>
                                    <OrderedListModal order={order} />
                                </Modal2>
                            </div>
                        </wrapper>
                        {/* body 부분 */}
                        < wrapper className='body' style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>

                            <GiMeat size='7em' style={{
                                border: '0.5px solid #c0c0c0',

                                marginRight: '1em',
                            }} />
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',

                            }}>
                                <div style={{
                                    width: '8em',

                                    fontWeight: 'bold',
                                    fontSize: '1.5em',
                                }}>
                                    {order.dinners[0].name}
                                </div>
                                <div>
                                    {order.style.content}
                                </div>
                            </div>
                        </wrapper>
                        {/* tail 부분 */}
                        <wrapper className='tail' style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <button style={{
                                border: '0.5px solid white',

                                width: '20em',
                                height: '4em',

                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: '#964b00',

                                boxShadow: '3px 6px 3px #c0c0c0',

                                // ...(hover ? {
                                //     backgroundColor: '#bc5e00',
                                // } : null)
                            }}
                                onClick={submitHandler} id={order.orderNum}
                            // onMouseEnter={() => {
                            //     setHover(true);
                            // }}
                            // onMouseLeave={() => {
                            //     setHover(false);
                            // }}
                            >
                                재주문 하기
                            </button>
                        </wrapper>
                    </container>
                ))
                }
            </div >


        </div >
    );
}

export default OrderedListPage;