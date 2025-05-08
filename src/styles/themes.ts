import type { TextStyle } from 'react-native';

export type Theme = {
  colors: {
    background: string;
    text: string;
  };
  text: {
    header: {
      fontSize: number;
      fontWeight: TextStyle['fontWeight'];
      fontFamily: string;
    };
    body: {
      fontSize: number;
      fontWeight: TextStyle['fontWeight'];
      fontFamily: string;
    };
  };
};

export const lightTheme: Theme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
  },
  text: {
    header: { fontSize: 24, fontWeight: 'bold', fontFamily: 'Inter-Var' },
    body: { fontSize: 16, fontWeight: 'normal', fontFamily: 'Inter-Var' },
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#000000',
    text: '#ffffff',
  },
  text: {
    header: { fontSize: 24, fontWeight: 'black', fontFamily: 'Inter-Var' },
    body: { fontSize: 16, fontWeight: 'normal', fontFamily: 'Inter-Var' },
  },
};
