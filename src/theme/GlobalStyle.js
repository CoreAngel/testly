import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap&subset=latin-ext');
    
    html {
        font-size: 62.5%;
    } 
    
    body {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.6rem;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    *, *::after, *::before {
      box-sizing: border-box;
    }
`;
