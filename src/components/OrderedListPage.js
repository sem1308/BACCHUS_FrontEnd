import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { backEndUrl } from '../configs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { parseToken } from "./Utils";

const History = () => {
    console.log("RENDERING...");
    const num = useParams().customerNum;
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cookies, , ] = useCookies(['token']);
    const navigate = useNavigate();
    const customerNum = parseToken(cookies.token).num;


    // 재주문 버튼 클릭 시 이전 주문 정보 POST
    // 버튼 id를 주문 번호로 지정
    const submitHandler = (e) => {
        const registOrder = async () => {
            const index = user.orders.findIndex(element => element.orderNum === Number(e.target.id));
            console.log(index);
            // 테스트
            const dto = {
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
            }

            console.log(dto);

            // 실제로 POST

            try {
                setError(null);
                await axios.post(
                    backEndUrl + '/order', {
                    foodCountDTOs: user.orders[index].foodCounts.map(fc => ({
                        foodNum: fc.food.foodNum,
                        count: fc.count
                    })),
                    insertOrderDTO: {
                        "dinnerNum": [user.orders[index].dinners[0].dinnerNum],
                        "customerNum": customerNum,
                        "totalPrice": user.orders[index].totalPrice,
                        "styleCode": user.orders[index].style.styleCode,
                        "wantedDeliveredTime": user.orders[index].wantedDeliveredTime,
                        "address": user.address,
                        "cardNum": user.cardNum
                    }
                }
                ).then(res =>
                    Swal.fire({
                        title: '주문 완료',
                        text: res.data.text,
                        icon: 'success',
                        confirmButtonText: '확인'
                    }).then((res) => {

                        if (res.isConfirmed) {
                            navigate(`/history/${num}`);
                        }
                        else {
                        }
                    })
                ).catch(res =>
                    Swal.fire({
                        title: '주문 실패',
                        text: res.data.text,
                        icon: 'error',
                        confirmButtonText: '확인'
                    }).then((res) => {
                        if (res.isConfirmed) {
                            alert("주문을 실패했습니다.")
                        }
                        else {
                        }
                    })
                );
            } catch (e) {
                setError(e);
                console.log(e);
            }
        };
        if (window.confirm("이전과 동일하게 주문하시겠습니까?")) {
            registOrder();
        } else {
        }
    }

    // 마운트 될 때만 호출
    // 로그인한 고객 정보와 고객의 주문 내역 상태값을 초기화한 뒤 렌더링
    useEffect(() => {
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
                // console.log(response);
            } catch (e) {
                console.log(e);
                setError(e);
            }
            setLoading(false);
        };
        fetchCustomers();
    }, []);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!orders) return null;

    return (
        <>
            <h1 style={{
                margin: "10px"
            }}>{user.name}님의 주문목록</h1>
            {orders.map((order) => (
                <ul>
                    <li>주문번호: {order.orderNum}</li>
                    <li>디너종류: {order.dinners[0].name}</li>
                    <li key={order.foodCounts.count}>음식구성: </li>
                    {order.foodCounts.map((f) => (
                        <ul key={f.food.foodNum}>{f.food.name}: {f.count}</ul>
                    ))}
                    <ul></ul>
                    <li>디너 스타일: {order.style.content}</li>
                    <button onClick={submitHandler} id={order.orderNum}>재주문 하기</button>
                </ul>
            ))}
            <Link style={{
                margin: "10px"
            }}
                to="/dinner">메인화면으로 돌아가기</Link>
        </>
    );
}

export default OrderedListPage;