import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const FormImtemWrapper = styled.div`
  height: 100%;
  border-bottom: 1px solid ${style['border-color']};
  font-size: 16px;

  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 75px;
  font-size: 16px;
  .label {
    width: 75px;
  }
  .input {
    width: 250px;
  }
  .suffix {
    width: 100px;
  }
  i {
    color: ${style['theme-color']};
  }
  .update {
    margin-left: 5px;
    margin-right: 10px;
    color: ${style['theme-color']};
    cursor: pointer;
  }
  .cancel {
    cursor: pointer;
  }
`;
