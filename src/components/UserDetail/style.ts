import styled from 'styled-components';

export const DetailWrapper = styled.div`
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
  @media (max-width: 768px) {
    display: none;
  }
`;
