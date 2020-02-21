import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 62.5%;
    }

    body {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.6rem;
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        ${({ overflowBody }) => overflowBody !== null && `overflow: ${overflowBody}`}
    }

    *, *::after, *::before {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
