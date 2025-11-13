export type TextStyle = {
  fontSize: 24 | 20 | 16 | 14;
  fontFamily: 'Inter800' | 'Inter600' | 'Inter300' | 'Inter' | 'InterItalic';
};

export type Theme = {
  colors: {
    background: string;
    backgroundAccent: string;
    text: string;
    faded: string;
    drillCard: {
      background: string;
    };
    orange: string;
    inactive: string;
  };
  text: Record<string, TextStyle>;
};

const baseTextStyles: Record<string, TextStyle> = {
  hero: { fontSize: 24, fontFamily: 'Inter800' },
  title: { fontSize: 20, fontFamily: 'Inter600' },
  label: { fontSize: 14, fontFamily: 'Inter300' },
  italic: { fontSize: 16, fontFamily: 'InterItalic' },
  body: { fontSize: 16, fontFamily: 'Inter' },
};

export const lightTheme: Theme = {
  colors: {
    background: '#f2f2f2',
    backgroundAccent: '#ffffff',
    text: '#000000',
    faded: '#eeeeee',
    drillCard: {
      background: 'rgba(255,255,255,0.8)',
    },
    orange: '#F2791C',
    inactive: '#808080',
  },
  text: {
    ...baseTextStyles,
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#0F0F0F',
    backgroundAccent: '#000000',
    text: '#ffffff',
    faded: '#514f4f',
    drillCard: {
      background: 'rgba(0,0,0,0.8)',
    },
    orange: '#F2791C',
    inactive: '#808080',
  },
  text: {
    ...baseTextStyles,
  },
};
