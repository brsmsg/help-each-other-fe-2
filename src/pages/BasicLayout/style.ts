import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const TopBarWrapper = styled.div`
  height: 50px;
  background-color: #fff;
  width: 100%px;
  .top_bar {
    width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    line-height: 30px;
    margin: 0 auto;
    .nav_bar {
      /* background-color: red; */
      height: 100%;
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      div {
        color: ${style['text-color-deep']};
        margin: 0 20px;
        &.active {
          color: ${style['theme-color']};
        }
      }
    }
    .avatar_wrapper {
      align-self: center;
      margin-right: 10px;
    }
  }
`;

export const Musk = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  left: 0;
  display: ${(props: { show: boolean }) => (props.show ? null : 'none')};
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;
