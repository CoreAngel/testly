import { createContext } from 'react';

const GlobalStyleContext = createContext(null);

export const { Provider, Consumer } = GlobalStyleContext;
export default GlobalStyleContext;
