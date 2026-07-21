import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { IconSymbol, AddTransactionNavButton, HapticTab } from '@/shared/ui';
const TabLayout = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme ?? 'light'];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          borderTopColor: colors.border,
          backgroundColor: colors.background,
        },
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: '통계',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="chart.bar.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          tabBarButton: AddTransactionNavButton,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: '달력',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});
