import { useCookies } from 'react-cookie';
import { parseToken } from './components/Utils';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function MiddleWare ({auth, isLogin, component, type}) {
  const navigate = useNavigate();
  const [cookies, , ] = useCookies(['token']);

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

  if(cookies.token === undefined){
    if(isLogin){
      nav('로그인 해야합니다.','로그인 페이지로 이동합니다.','/login/'+type);
    }
  }else if(auth !== null){
    const roles = parseToken(cookies.token).roles;
    console.log(roles);
    if(auth !== roles[0]){
      if(roles.length ===2){
        if((auth !== roles[1]))
        nav('권한이 없습니다.','로그인 페이지로 이동합니다.','/login/'+type);
      }else{
        nav('권한이 없습니다.','로그인 페이지로 이동합니다.','/login/'+type);
      }
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