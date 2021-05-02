import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const UserInfoWrapper = styled.div`
  width: 960px;
  /* height: 100px; */
  margin: 20px auto;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Head = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 700px;
  height: 60px;
  background: #fff;
  text-align: start;
  padding-left: 20px;
  line-height: 60px;
  font-weight: bolder;
  font-size: 100%;
  border-bottom: ${style['border-color']} solid 1px;
`;
