import styled from 'styled-components';
import style from '@/assets/gloabalStyle'

export const NavBarWrapper = styled.div`
  width:100%;
  height: 45px;
  border-top: 2px ${style["border-color"]} solid;
  border-bottom: 2px ${style["border-color"]} solid;
  color: ${style["text-color-shallow"]};
  background-color: #ffffff;
  .nav_bar{
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .active{
      color: ${style["text-color-theme"]};
      border-bottom: 3px ${style["text-color-theme"]} solid;
    }
  }
`

export const NavBarItem = styled.div`
  height: 45px;
  font-size: 15px;
  line-height: 45px;
  cursor: pointer
`