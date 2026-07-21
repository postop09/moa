import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';

export const AddTransactionNavButton = (props: BottomTabBarButtonProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.wrapper}>
      <PlatformPressable
        {...props}
        style={[
          styles.button,
          { backgroundColor: colors.expense },
          pressed && styles.pressed,
        ]}
        onPressIn={(ev) => {
          setPressed(true);
          if (process.env.EXPO_OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
          props.onPressIn?.(ev);
        }}
        onPressOut={(ev) => {
          setPressed(false);
          props.onPressOut?.(ev);
        }}
      >
        <MaterialIcons name="add" size={32} color="#fff" />
      </PlatformPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: -18,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  pressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.92,
  },
});
