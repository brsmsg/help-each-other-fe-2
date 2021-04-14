import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const MessageWrapper = styled.div`
  width: 960px;
  margin: 20px auto;
  position: relative;
`;

export const ContactWrapper = styled.div`
  width: 240px;
  background: #fff;
  height: 100px;
`;

export const MessageListWrapper = styled.div`
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
  }
`;
