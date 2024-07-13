// context/HeaderContext.js
'use client'
import { createContext, useState } from 'react';

export const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [active, setActive] = useState(false);

  return (
    <HeaderContext.Provider value={{ active, setActive }}>
      {children}
    </HeaderContext.Provider>
  );
}
