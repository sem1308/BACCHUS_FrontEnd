import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import styled from 'styled-components';

const CardImgBox = styled.img`
  height:250px;
  max-width: 300px;
`;

const CardTextBox = styled.div`
  padding-top : 2px;
  font: caption;
  font-size : 13px;
  min-height: 50px;
`;

function DinnerList() {
  const [dinners, setDinners] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 dinners 를 초기화하고
        setError(null);
        setDinners(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'http://13.125.101.4:8080/dinner'
        );
        setDinners(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        console.log(e)
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!dinners) return null;
  // 음식 내용 : foodNum, name, price, type
  return (
    <Row xs={4} md={4} className="g-4">
      {dinners.map(dinner => (
        <Col>
            <Card>
              <CardImgBox alt="" variant='top' className="card-img" src={`imgs/${dinner.name}.jpeg`}></CardImgBox>
                <Card.Body>
                    <Card.Title>{dinner.name}</Card.Title>
                    <CardTextBox>
                        {dinner.extraContent}
                    </CardTextBox>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">적정 인원 : {dinner.numPeople}</small>   
                </Card.Footer>
            </Card> 
        </Col>
      ))}
    </Row>
  );
}

export default DinnerList;