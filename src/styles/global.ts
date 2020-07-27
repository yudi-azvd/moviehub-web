import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }
`;
