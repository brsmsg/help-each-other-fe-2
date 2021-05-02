import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const MessageWrapper = styled.div`
  width: 960px;
  @media (max-width: 768px) {
    width: 100%;
  }
  margin: 20px auto;
  position: relative;
  .none {
    display: none;
  }
  .show {
    display: block;
  }
`;

export const ContactWrapper = styled.div`
  width: 240px;
  background: #fff;
  height: 100px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MessageListWrapper = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  position: absolute;
  right: 0;
  top: 0;
  width: 700px;
  min-height: 610px;
  background: white;
  .title {
    height: 58px;
    border-bottom: solid 1px ${style['border-color']};
    line-height: 58px;
    padding-left: 20px;
    .user_msg {
      display: none;
      @media (max-width: 768px) {
        display: inline-block;
        float: right;
        margin-right: 20px;
        color: ${style['theme-color']};
      }
    }
  }
`;
