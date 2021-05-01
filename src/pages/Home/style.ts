import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const HomeWrapper = styled.div`
  width: 960px;
  /* height: 100px; */
  margin: 10px auto;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PostListWrapper = styled.div`
  width: 700px;
  @media (max-width: 768px) {
    width: 100%;
  }
  /* height: 1000px; */
  background-color: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  .post_header {
    width: 100%;
    height: 40px;
    border-bottom: 2px ${style['border-color']} solid;
    line-height: 40px;
    font-size: 13px;
    span {
      padding: 0 20px;
      color: ${style['text-color-shallow']};
      cursor: pointer;
      :first-child {
        border-right: 1px solid ${style['text-color-shallow']};
      }
      &.active {
        color: ${style['theme-color']};
      }
    }
  }
`;

export const UserListWrapper = styled.div`
  width: 240px;
  background-color: #ffffff;
  position: absolute;
  right: 0;
  top: 0;
  @media (max-width: 768px) {
    display: none;
  }
`;
