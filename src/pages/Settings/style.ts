import styled from 'styled-components';
import style from '@/assets/gloabalStyle';

export const SettingsWrapper = styled.div`
  width: 960px;
  margin: 20px auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SettingProfile = styled.div`
  width: 700px;
  padding: 40px 100px;
  background: #fff;
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem
  }
`;
