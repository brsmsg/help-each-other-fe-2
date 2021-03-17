import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const HomeWrapper = styled.div`
  width: 80%;
  height: 100px;
  margin: 10px auto;
  position: relative;
`;

export const PostList = styled.div`
  width: 75%;
  height: 1000px;
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
        border-right: 1px solid;
      }
    }
  }
`;

export const PostItem = styled.div`
  width: 100%;
  height: 130px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px ${style['border-color']} solid;
  .item_left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 50px;
    .title {
      margin-top: 10px;
      font-size: 25px;
    }
    .post_info {
      margin-top: 10px;
      display: flex;
      div {
        font-size: 10px;
        color: ${style['text-color-shallow']};
        margin-right: 10px;
      }
    }
    .content {
      width: 70%;
      height: 30px;
      margin-top: 10px;
      line-height: 15px;
      font-size: 15px;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${style['text-color-deep']};
      ::after {
        position: absolute;
        bottom: 0;
        right: 0;
        content: '...';
      }
    }
  }
  .item_right {
    width: 100px;
    height: 100px;
  }
`;
