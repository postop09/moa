import { useThemeColor } from '@/shared/lib';
import { View, type ViewProps } from 'react-native';

type Props = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: Props) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};
