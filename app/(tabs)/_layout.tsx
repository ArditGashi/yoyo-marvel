/* import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
 */

import { Tabs } from 'expo-router'
import React, { useMemo } from 'react'
import {
  Home,
  Clapperboard,
  Download,
  Search,
  LucideIcon,
} from 'lucide-react-native'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import Colors from '@/constants/Colors'
import winHeight from '@/constants/Dimensions'
import dimensions from '@/constants/Dimensions'
import { Header } from '@/components/navigation/Header'

type TabBarIconProps = {
  focused: boolean
  color: string
}

export default function TabLayout() {
  /*   const colorScheme = useColorScheme()
   */
  const { activeColor, inactiveColor } = useMemo(
    () => ({
      activeColor: Colors.dark.yoyo,
      inactiveColor: Colors.dark.tabIconDefault,
    }),
    []
  )

  const headerHeight = dimensions.winHeight * 0.15

  const renderTabBarIcon =
    (Icon: LucideIcon) =>
    ({ focused }: TabBarIconProps) =>
      <TabBarIcon Icon={Icon} color={focused ? activeColor : inactiveColor} />

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          height: dimensions.winHeight * 0.1,
          backgroundColor: Colors.dark.background,
        },
        headerShown: true,
        headerTitle: Header,
        headerStyle: {
          height: headerHeight,
          backgroundColor: Colors.dark.background,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: renderTabBarIcon(Home),
        }}
      />
      <Tabs.Screen
        name='movies'
        options={{
          title: 'Movies',
          tabBarIcon: renderTabBarIcon(Clapperboard),
        }}
      />
      <Tabs.Screen
        name='download'
        options={{
          title: 'Download',
          tabBarIcon: renderTabBarIcon(Download),
        }}
      />
      <Tabs.Screen
        name='find'
        options={{
          title: 'Find',
          tabBarIcon: renderTabBarIcon(Search),
        }}
      />
    </Tabs>
  )
}
