import { StyleSheet } from 'react-native';
import { Theme } from './themes';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      width: '49%',
      backgroundColor: theme.colors.background,
      borderRadius: 4,
      overflow: 'hidden',
      flexDirection: 'column',
    },
    image: {
      width: '100%',
      resizeMode: 'cover',
      aspectRatio: 0.5625,
    },
    content: {
      padding: 16,
      width: '100%',
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
    },
  });
