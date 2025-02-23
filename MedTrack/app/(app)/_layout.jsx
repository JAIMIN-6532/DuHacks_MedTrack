import { Tabs } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: '#192f6a',
        tabBarInactiveTintColor: '#a0a0a0',
        
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="AddMedicine"
        options={{
          title: 'Add Medicine',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="Orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
        />
    </Tabs>
  );
}