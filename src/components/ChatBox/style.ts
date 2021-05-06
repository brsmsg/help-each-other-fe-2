import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const ChatBoxWrapprer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 610px;
  width: 700px;
  background: ${style['theme-color']};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    background: none;
  }
`;
