import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const LoginWrapper = styled.div`
width: 270px;
height: 300px;
position: absolute;
padding: 20px;
background-color: white;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
z-index: 1000;
/* display */
display: ${(props: { login: boolean }) => props.login ? "" : "none"} ;
div{
  display: flex;
  flex-direction: column;
  position: relative;
  i{
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  h1{
    margin-bottom: 20px;
    color: ${style["theme-color"]};
  }
    .input_group{     
    div{
      border: 1px solid #e9e9e9;
      padding: 5px;
      height: 40px;
      box-sizing: border-box;
      margin-bottom: 20px;
      input{
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
      }
    }
  }
  button{
    height: 40px;
    box-sizing: border - box;
    outline: none;
    border-radius: 2px;
    color: white;
    background-color:${style["theme-color"]};
    cursor: pointer
  }
  .to_register{
    line-height:12px;
    font-size: 12px;
    margin-top:10px;
    display: inline-block;
    span{
      color: ${style["theme-color"]};
      cursor: pointer
    }
  }
  .protocal{
    display: block;
    line-height: 12px;
    height: 20px;
    font-size: 12px;
    margin-top: 10px;
    a{
      color: ${style["theme-color"]};
      cursor: pointer;
    }
  }
}
`