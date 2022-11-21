import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Span = styled.span`
  font-size : ${props => props.fs || '16px'};
`;

/* 홈 */
export const HomeBlock = styled.div`
    width: 1000px;
    padding-top: 230px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-content: space-between;
`;

export const LinkBlock = styled.div`
    position: relative;
    text-decoration: none;
    color : black;
    cursor: pointer;
    width: 450px;
    height : 450px;
    font-size: 40px;
    border-radius: 10%;
    border : rgba(158, 125, 90,0.5);
    margin: 55px auto 0;
    box-shadow : 0 0 10px 0px rgba(158, 125, 90,0.7);

    &:hover{
        color : black;
        box-shadow : 0 0 20px 0px rgba(158, 125, 90,1);
    }
`;

/* 기본 컨텐트 */
export const ContentBlock = styled.div`
  position: ${props => props.position || 'relative'};
  display : ${props => props.display || 'block'};
  flex-direction : ${props => props.flex_direction || 'row'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  align-items : ${props => props.align_items || 'center'};
  text-align : ${props => props.text_align || 'start'};
  justify-items : ${props => props.justify_items || 'center'};
  justify_content : ${props => props.justify_content || 'flex-start'};
  font-size : ${props => props.fs || 'auto'};
  font-weight : ${props => props.fw || '400'};
  opacity : ${props => props.opacity || '1'};
  color : ${props => props.color || 'black'};
  background-color: ${props => props.bg || 'none'};
  overflow: ${props => props.overflow || 'none'};
  border-bottom : ${props => props.border_bottom || 'none'};
`

export const DinnerBlock = styled.div`
    position: relative;
    width: 1000px;
    padding-top: 130px;
    margin: 55px auto;
    display: flex;
    flex-direction: column;
    align-content: space-between;
`;

export const Pre = styled.pre`
  width: ${props => props.width || 'auto'};
  box-shadow : 0 2px 0 0 ${props => props.color || '#fff'};
  margin-top : ${props => props.mt || '0px'};
  margin-left : ${props => props.ml || '0px'};
  margin-bottom : ${props => props.mb || '0px'};
  padding : ${props => props.padding || 'auto'};
  color: #4f382a;
  font-family: var(--bs-body-font-family);
  font-size: ${props => props.fs || '24px'};
  font-weight: ${props => props.fw || '400'};
  line-height: ${props => props.lh || '48px'}; 
  text-align: ${props => props.text_align || 'start'}; 
`;

/* 카드 */
export const CardImgBox = styled.img`
  height: 250px;
  max-width: 400px;
`;

export const CardTextBox = styled.pre`
  padding-top : 2px;
  font: caption;
  font-size : 13px;
  min-height: 50px;
`;

/* 이미지 */
export const ImgBox = styled.div`
  display : ${props => props.display || 'inline-flex'};
  height: ${props => props.height || '45px'};
  width: ${props => props.width || '45px'};
  margin :  ${props => props.margin || '0'};
  max-width : 1000px;
  align-content : center;
  justify-content : center;
`

export const Img = styled.img`
  height: ${props => props.height || '300px'};
  margin :  ${props => props.margin || 'auto'};
  max-width: 100%;
`

/* 모달 */
export const ModalBlock = styled.div`
  padding : 20px;
  position: relative;
  margin: 0 auto;
  display: flex;
  height : ${props => props.height || 'auto'};
  flex-direction : ${props => props.flex_direction || 'row'};
  overflow: ${props => props.overflow || 'none'};
`

/* 버튼 */
export const ButtonBlock = styled.div`
  display : flex;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  justify-content : right;
`

export const Btn = styled.button`
  border-radius : ${props => props.radius || '20%'};
  padding : 10px;
  margin : 5px;
  color : white;
  border : 0;
  outline:0;
  background-color : ${props => props.bg_color || 'rgba(184,134,11,0.7)'};

  &:hover{
    background-color : ${props => props.bg_color_hover || 'rgba(184,134,11,1)'};
  }
`


/* JWT 토큰 */
export const parseToken = (token) => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const encodeFileToBase64 = (fileBlob, setImageSrc) => {
  console.log(fileBlob);
  const reader = new FileReader();
  reader.readAsDataURL(fileBlob);
  return new Promise((resolve) => {
    reader.onload = () => {
      setImageSrc(reader.result);
      resolve();
    };
  });
};

/* 로그인, 회원가입 */

export const CustomerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
    height: 100vh;
    `;

export const CustomerForm = styled.form`
        display: flex;
        flex-direction: column;
    `

export const CustomerLink = styled(Link)`
    color: #8B4513;
    text-decoration: none;
    font-size: 0.8em;
    &:hover {
        color: #bc5e00;
    }
`;

export const CustomerHeader = styled.div`
        display: flex;
        flex-direction: column;
    `

export const CustomerInput = styled.input`
    border: 0;
    border-bottom: 1px solid #c0c0c0;
    margin-top: 1em;
    margin-bottom: 1em;
    &:hover {
        border-bottom-color: black;
    }
`

export const CustomerButton = styled.button`
    display: inline-block;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 1rem;
    background: #8B4513;
    box-shadow: 5px 3px 3px grey;
    cursor: pointer;


    height: 2.25rem;
    font-size: 1rem;
    margin-bottom: 1em;

    &:hover {
        background: #bc5e00;
    }

    &:active {
        background: #bc5e00;
    }
    `;