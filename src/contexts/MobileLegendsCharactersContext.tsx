import { createContext, useContext } from 'react';

const MobileLegendsCharactersContext = createContext(null);

export const useMobileLegendsCharacters = () => useContext(MobileLegendsCharactersContext);

export default MobileLegendsCharactersContext;
