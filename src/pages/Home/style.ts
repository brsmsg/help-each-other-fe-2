import styled from 'styled-components';
import style from '@/assets/gloabalStyle'

export const HomeWrapper = styled.div`
  width: 80%;
  height: 100px;
  margin: 10px auto;
  position: relative;
`

export const PostList = styled.div`
  width: 75%;
  height: 1000px;
  background-color: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  .post_header{
    width: 100%;
    height: 40px;
    border-bottom: 2px ${style["border-color"]} solid;
    line-height: 40px;
    font-size: 13px;
    span{
      padding: 0 20px;
      color: ${style["text-color-shallow"]};
      cursor: pointer;
      :first-child{
        border-right: 1px solid;
      }
    }
  }
`

export const PostItem = styled.div`
  
`