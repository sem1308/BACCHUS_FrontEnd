import styled from 'styled-components';

export const Span = styled.span`
  font-size : ${props => props.fs || '16px'};
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
  justify-items : ${props => props.justify_items || 'center'};
  font-size : ${props => props.fs || 'auto'};
`

export const DinnerBlock = styled.div`
    position: relative;
    width: 1220px;
    padding-top: 130px;
    margin: 55px auto 0;
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
  height:250px;
  max-width: 300px;
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