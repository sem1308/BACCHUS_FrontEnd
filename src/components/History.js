import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backEndUrl } from '../configs';

const History = () => {
    const num = useParams().customerNum;
    console.log(num);
    const [customers, setcustomers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchcustomers = async () => {
            try {
                // 요청 시작 시 error와 customers 초기화
                setError(null);
                setcustomers(null);
                // loading 상태를 true로 변경
                setLoading(true);
                const response = await axios.get(
                    backEndUrl + `/customer/${num}`
                );
                setcustomers(response.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        fetchcustomers();
    }, []);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!customers) return null;

    customers.orders.map((order) => {
        console.log(order.dinners[0].name);
        console.log(order.style.styleCode)
        console.log(order.style.content)
    })
    // console.log(customers.orders)

    return (
        <>
            <h1 style={{
                margin: "10px"
            }}>{num}번님의 주문목록</h1>
            <ul>
                {customers.orders.map((order) => (
                    <li style={{
                        margin: "10px"
                    }}
                        key={order.orderNum}>{order.dinners[0].name} | {' '}
                        <Link to={`/dinner/${order.dinners[0].dinnerNum}`}>주문하기</Link></li>
                ))}
            </ul>
            <Link style={{
                margin: "10px"
            }}
                to="/dinner">주문화면으로 돌아가기</Link>
        </>
    );
}

export default History;