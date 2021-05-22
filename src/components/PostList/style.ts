import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const ListWrapper = styled.div`
  background-color: #fff;
  width: 700px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PostItem = styled.div`
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px ${style['border-color']} solid;
  .item_left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 50px;
    @media (max-width: 768px) {
      padding: 0 20px;
    }
    .title {
      margin-top: 10px;
      font-size: 1.3rem;
      font-weight: bold;
      :hover {
        cursor: pointer;
        color: ${style['theme-color']};
      }
    }
    .post_info {
      margin-top: 10px;
      display: flex;
      div {
        font-size: 13px;
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
    .other_info {
      padding: 10px 0;
      li {
        display: inline-block;
        box-sizing: border-box;
        width: 70px;
        height: 25px;
        border: 1px ${style['border-color']} solid;
        line-height: 25px;
        text-align: center;
        font-size: 0.8rem;
        color: ${style['text-color-deep']};
        :nth-child(2) {
          margin-left: -1px;
        }
        i {
          font-size: 0.8rem;
          margin-right: 3px;
        }
      }
    }
  }
  .item_right {
    width: 100px;
    height: 100px;
    margin-right: 40px;
    .wrapper {
      /* width: 100%;
      height: 100%; */
      /* background-size: contain; */
      background: no-repeat;
    }
  }
`;
