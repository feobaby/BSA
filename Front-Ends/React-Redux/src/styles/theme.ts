//theme.ts
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#2C2C2C',
      },
    }),
  },
});
