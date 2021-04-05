import styled from 'styled-components';

export const PostFormWrapper = styled.div`
  width: 960px;
  height: 100px;
  margin: 20px auto;
  position: relative;

  .author_detail {
    width: 240px;
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

export const FormWrapper = styled.div`
  width: 700px;
  /* height: 300px; */
  background-color: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  padding: 40px 100px;
`;
