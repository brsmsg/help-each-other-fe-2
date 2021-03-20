import styled from 'styled-components';

export const TopBar = styled.div`
  height: 50px;
  /* background-color: black; */
  /* width: 100%px; */
  width: 1200px;
  display: flex;
  justify-content: space-around;
  line-height: 30px;
  margin: 0 auto;
  span {
  }
  .nav_bar {
    background-color: red;
    height: 100%;
    width: 80%;
    margin: 0 auto;
    display: flex;
  }
  .avatar_wrapper {
    align-self: center;
    margin-right: 10px;
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
