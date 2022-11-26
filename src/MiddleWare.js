import { useCookies } from 'react-cookie';
import { parseToken } from './components/Utils';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function MiddleWare ({auth, isLogin, component, type}) {
  const navigate = useNavigate();
  const [cookies, , ] = useCookies(['cusToken','empToken']);

  const nav = async (title,text, loc) => {
    await Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: '확인'
    }).then((res) => {
      return navigate(loc);
    })
  }

  if((type === '' && cookies.cusToken === undefined) || 
  (type==='employee' && cookies.empToken === undefined)){
    if(isLogin){
      nav('로그인 해야합니다.','로그인 페이지로 이동합니다.','/login/'+type);
    }
  }else{
    let roles = [];
    if(auth === 'CUSTO'){
      roles = parseToken(cookies.cusToken).roles;
    }else{
      roles = parseToken(cookies.empToken).roles;
    }
    if(!roles.includes(auth)){
      nav('권한이 없습니다.','로그인 페이지로 이동합니다.','/login/'+type);
    }
  }

  return component;
}

MiddleWare.defaultProps = {
  auth: null,
  isLogin : false,
  component : null,
  type : ''
}

export default MiddleWare;