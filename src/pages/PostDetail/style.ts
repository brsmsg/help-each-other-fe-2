import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const PostWrapper = styled.div`
  width: 1200px;
  height: 100px;
  margin: 20px auto;
  position: relative;
  .post_detail {
    width: 900px;
    background-color: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
    .post_body {
      /* padding: 20px 50px; */
      .title {
        text-align: center;
        font-weight: bolder;
        font-size: 40px;
        margin-bottom: 10px;
      }
      .content {
        line-height: 1.5rem;
        font-size: 1rem;
      }
      .offer_help {
        /* margin-top: 20px; */
        /* height: 40 */
        /* display: flex; */
        /* flex-direction: column; */
        margin: 30px 0;
        padding: 10px 0;
        border-top: 2px ${style['border-color']} solid;
      }
    }
  }

  .author_detail {
    width: 290px;
    /* height: 300px; */
    background-color: #ffffff;
    position: absolute;
    right: 0;
    top: 0;
    .stat {
      /* text-align: center; */
      margin: 20px 0 0;
    }
  }
`;

export const PostDetailWrapper = styled.div`
  width: 900px;
  height: 1000px;
  background-color: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  .post_header {
    height: 90px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 50px;
    border-bottom: 2px solid ${style['border-color']};
    .other_info_box {
      margin: 0 15px;
      h1 {
        font-weight: bold;
        line-height: 20px;
        font-size: 20px;
        margin-bottom: 5px;
      }
      span {
        font-size: 13px;
        color: ${style['text-color-shallow']};
        margin-right: 10px;
      }
    }
  }
  .post_body {
    padding: 20px 50px;
    .title {
      text-align: center;
      font-weight: bolder;
      font-size: 40px;
      margin-bottom: 10px;
    }
    .content {
      line-height: 1.5rem;
      font-size: 1rem;
    }
  }
`;

// export const AuthorDetailWrapper = styled.div`
//   box-sizing: border-box;
//   width: 290px;
//   height: 300px;
//   background-color: #ffffff;
//   position: absolute;
//   right: 0;
//   top: 0;
// `;
