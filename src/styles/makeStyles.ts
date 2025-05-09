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
      fontFamily: theme.text.body.fontFamily,
      borderColor: theme.colors.faded,
      borderWidth: 1,
      borderRadius: 50,
    },
    content: {
      padding: 16,
    },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    searchInputHeader: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderRadius: 4,
      padding: 8,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
    },
    modalContent: {
      margin: 20,
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 8,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    flatlist: {
      padding: 8,
      gap: 4,
    },
  });
