import { Pressable, PressableProps, Text } from 'react-native';
import { useTheme } from '../../contexts/theme';

type Variant = 'solid' | 'outline';

interface Props extends PressableProps {
  text: string;
  variant?: Variant;
}

export function Button({ onPress, text, variant = 'solid', disabled }: Props) {
  const { theme } = useTheme();

  const active =
    variant === 'outline'
      ? {
          bg: theme.colors.backgroundAccent,
          text: theme.colors.text,
          border: theme.colors.inactive,
        }
      : {
          bg: theme.colors.orange,
          text: 'black',
          border: theme.colors.inactive,
        };

  const inactive =
    variant === 'outline'
      ? {
          bg: theme.colors.backgroundAccent,
          text: theme.colors.faded,
          border: '#E0E0E0',
        }
      : {
          bg: '#F2C79E',
          text: '#444',
          border: '#F2C79E',
        };

  const palette = disabled ? inactive : active;

  return (
    <Pressable
      disabled={disabled}
      accessibilityState={{ disabled: !!disabled }}
      onPress={onPress}
      style={[
        {
          backgroundColor: palette.bg,
          padding: 12,
          borderRadius: 6,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: palette.border,
        },
      ]}
    >
      <Text
        style={{
          color: palette.text,
          fontSize: theme.text.body.fontSize,
          fontFamily: theme.text.body.fontFamily,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
