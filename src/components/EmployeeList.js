import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { backEndUrl } from '../configs';
import { Btn, ContentBlock} from './Utils';

const occupationToWord = {
  'CK' : '요리사',
  'DM' : '배달원',
  'RM' : '매니저' 
}

function EmployeeList() {
  let { isApproved } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(false);
    await axios.get(
      backEndUrl+'/employee'
    ).then(response=>
      setEmployees(response.data.filter(emp=>
        Number(emp.approved) === Number(isApproved)
      ))
    ).catch(e=>{
      setError(true);
    });
    setLoading(false);
  }

  useEffect(()=>{
    fetchEmployees();
  },[isApproved]);
  
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!employees) return null;

  const onSubmitHandler = async (event) => {
    try {
      await axios.put(backEndUrl + '/employee/'+event.target.id, {
        approved : true
      })
      alert('회원가입 되었습니다.');
      fetchEmployees();
  } catch (e) {
      alert(e.response.data.message);
      console.log(e);
  }
}

  return (
    <ContentBlock margin='0 0 50px 0'>
      <Row xs={4} md={4} className="g-4">
        {employees.map(employee => {
          return <Col key={employee.employeeNum}>
            <ContentBlock>
              이름 : {employee.name}
            </ContentBlock>
            <ContentBlock>
              직종 : {occupationToWord[employee.occupation]}
            </ContentBlock>
            {Number(isApproved) === 0 ?
            <Btn id={employee.employeeNum} radius='10px' onClick={onSubmitHandler}>직원등록</Btn> : ''}
          </Col>
          }
        )}
      </Row>
    </ContentBlock>
  );
}

export default EmployeeList;