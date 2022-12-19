import React, { createContext } from 'react';
interface IColorContextSchema {
  toggleColorMode: () => void;
}
export const ColorModeContext = createContext<IColorContextSchema>({} as IColorContextSchema);
