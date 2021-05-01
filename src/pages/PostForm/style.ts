import styled from 'styled-components';

export const PostFormWrapper = styled.div`
  width: 960px;
  height: 100px;
  margin: 20px auto;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  .textarea {
    width: 400px;
    height: 300px;
    @media (max-width: 768px) {
      height: 200px;
    }
  }
  .detail {
    @media (max-width: 768px) {
      display: none;
    }
  }
  .submit {
    width: 300px;
    @media (max-width: 768px) {
      width: 80%;
    }
  }
`;

export const FormWrapper = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    padding: 40px;
  }
  width: 700px;
  /* height: 300px; */
  background-color: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  padding: 40px 100px;
`;
