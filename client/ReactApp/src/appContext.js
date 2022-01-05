import React from 'react';
import { useContext } from 'react';

const appContext = React.createContext({});

export const useAppContext = () => useContext(appContext)

export default appContext;