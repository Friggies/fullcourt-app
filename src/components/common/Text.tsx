import React from 'react';
import { Text as RNText, TextProps, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '../../contexts/theme';

type Variant = 'hero' | 'title' | 'label';

interface Props extends TextProps {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export function Text({ variant, children }: Props) {
  const { theme } = useTheme();

  let size: 24 | 20 | 16 | 14;
  let family: 'Inter800' | 'Inter600' | 'Inter300' | 'Inter' | 'InterItalic';

  switch (variant) {
    case 'hero':
      size = theme.text.hero.fontSize;
      family = theme.text.hero.fontFamily;
      break;
    case 'title':
      size = theme.text.title.fontSize;
      family = theme.text.title.fontFamily;
      break;
    case 'label':
      size = theme.text.label.fontSize;
      family = theme.text.label.fontFamily;
      break;
    default:
      size = theme.text.body.fontSize;
      family = theme.text.body.fontFamily;
      break;
  }

  return (
    <RNText
      style={{
        color: theme.colors.text,
        fontSize: size,
        fontFamily: family,
      }}
    >
      {children}
    </RNText>
  );
}
