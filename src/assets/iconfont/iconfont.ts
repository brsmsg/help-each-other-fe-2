import {
  createGlobalStyle
} from 'styled-components';

export const IconStyle = createGlobalStyle `
  @font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1615707099257'); /* IE9 */
  src: url('./iconfont.eot?t=1615707099257#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKUAAsAAAAABmQAAAJHAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApwfAE2AiQDCAsGAAQgBYRtBy8boQXInpo8KdJyH0KADLYAARgieH6tzfu7eyokEe2eRRPNEqmQIDZSIXsJdzWXmxLKB7Xj/9m9KpFCG9xL+HJQRk1GVplWKPadyvYEzxA1HRzGpQ9MlxbJ84l7p38CfZDWA8pxLxpr0qQuoC4OpAD3wjZZCWXcMHaBSzhPoGZShXE6t7IOA3LWtEC8hL4NAzm/XM5SFaFUszYX7wqV9Jpegbfw+/GvFQMkRcaquHie9WDiq2xnZKcj0L1PCBDQ5gIZ1oGcuKmNn+kWjOtWi/eYBfsqDb7Ko5FvE3s1C/bXWcUNMA4l9yR1ZbeaSnBbfU0CK6OeRkwe3DvzHuoyfPaU30b+cy/Uo0cMt63q6A5a/p0SlKLgbsEolRxGYRcmYMQh/LPspmsGgvntn19z3P+K5OBTfbyHplw/J6js0RH8GWnPllyXW9aUq9LazmTyjFU1NYxgd8/XWMPwNtKhYjjCWTaRIlMxT+bsOgp1+yipOEDNmvnNdX1St8irWHUFEDpekLR8INPxRubsJwpj/lDSiW7U3AV71i1GOJQkW5OHzh6GLs+YY9dDUekq+VuJLbPykLdJUoUhbNYaxdQ8ZSTnWKC2/ZbWDJnkKc6ByyhJOOaSR+TqWqB13qnXWd2bai5PYcgJidg04kGOPSjk4jLM764NlT6/ivi2JGyypakmvolISjg4aqpp9CDnNVmvpnu5Rtnma9E0BjESl0JzYBRJJDiU14+KEJdWE4yI5jrqdjvWV1NbX5d+3R6osYwp7CGZ4kFypQAAAAAA') format('woff2'),
  url('./iconfont.woff?t=1615707099257') format('woff'),
  url('./iconfont.ttf?t=1615707099257') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./iconfont.svg?t=1615707099257#iconfont') format('svg'); /* iOS 4.1- */
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

`
