import { StyleSheet } from 'react-native';
import { Theme } from './themes';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      borderRadius: 4,
      flexDirection: 'column',
    },
    image: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
    },
    categories: {
      position: 'absolute',
      flexDirection: 'row',
      gap: 4,
      top: 140,
      right: 16,
    },
    categoryText: {
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      paddingVertical: 4,
      paddingHorizontal: 8,
      fontSize: 12,
      fontWeight: theme.text.body.fontWeight,
      fontFamily: theme.text.body.fontFamily,
      borderColor: '#f2f2f2',
      borderWidth: 1,
      borderRadius: 50,
    },
    content: {
      padding: 16,
    },
    title: {
      color: theme.colors.text,
      fontSize: theme.text.header.fontSize,
      fontWeight: theme.text.header.fontWeight,
      fontFamily: theme.text.header.fontFamily,
    },
    infoText: {
      color: theme.colors.text,
      fontSize: theme.text.body.fontSize,
      fontWeight: theme.text.body.fontWeight,
      fontFamily: theme.text.body.fontFamily,
    },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
  });
