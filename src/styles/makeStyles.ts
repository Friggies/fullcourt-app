import { StyleSheet } from 'react-native';
import { Theme } from './themes';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      width: '49%',
      backgroundColor: theme.colors.backgroundAccent,
      borderRadius: 4,
      overflow: 'hidden',
      flexDirection: 'column',
    },
    cardPlayers: {
      position: 'absolute',
      backgroundColor: theme.colors.drillCard.background,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 2,
      top: 5,
      right: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 3,
    },
    cardBookmarked: {
      position: 'absolute',
      backgroundColor: theme.colors.drillCard.background,
      paddingHorizontal: 6,
      paddingVertical: 5,
      borderRadius: 2,
      top: 5,
      left: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 3,
    },
    image: {
      width: '100%',
      resizeMode: 'cover',
      aspectRatio: 0.5625,
    },
    content: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: theme.colors.drillCard.background,
      padding: 8,
      width: '100%',
      flex: 1,
    },
    info: {
      marginTop: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    searchInputHeader: {
      flex: 1,
      backgroundColor: theme.colors.backgroundAccent,
      borderRadius: 4,
      padding: 8,
    },
    modalOverlay: {},
    modalContent: {
      margin: 20,
      padding: 8,
      gap: 16,
    },
    modalButtons: {
      flexDirection: 'column',
      marginTop: 16,
      gap: 8,
    },
    flatlist: {
      padding: 8,
    },
    button: {
      backgroundColor: theme.colors.orange,
      padding: 12,
      borderRadius: 6,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.orange,
    },
    buttonOutline: {
      backgroundColor: theme.colors.backgroundAccent,
      color: theme.colors.text,
    },
    buttonText: {
      color: 'black',
    },
  });
