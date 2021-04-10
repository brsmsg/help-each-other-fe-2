import { createGlobalStyle } from 'styled-components';

export const IconStyle = createGlobalStyle`
  @font-face {
  font-family: 'iconfont';  /* project id 2418982 */
  src: url('//at.alicdn.com/t/font_2418982_ge1hjlai3h.eot');
  src: url('//at.alicdn.com/t/font_2418982_ge1hjlai3h.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2418982_ge1hjlai3h.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2418982_ge1hjlai3h.woff') format('woff'),
  url('//at.alicdn.com/t/font_2418982_ge1hjlai3h.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2418982_ge1hjlai3h.svg#iconfont') format('svg');
}
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-cross:before {
  content: "\e61a";
}
`;
