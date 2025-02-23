// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';

// export default function RootLayout() {
//   return (
//     <>
    
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="auth" />
//         <Stack.Screen name="(app)" />
//       </Stack>
//       <StatusBar style="auto" />
//     </>
//   );
// }





//////////////////////

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { handleNotificationResponse } from '../utils/notifications';

export default function RootLayout() {
  // useEffect(() => {
  //   // Set up notification categories/actions
  //   Notifications.setNotificationCategoryAsync('medicine-reminder', [
  //     {
  //       identifier: 'TAKEN',
  //       buttonTitle: 'Taken',
  //       options: {
  //         isDestructive: false,
  //         isAuthenticationRequired: false,
  //       },
  //     },
  //     {
  //       identifier: 'MISSED',
  //       buttonTitle: 'Missed',
  //       options: {
  //         isDestructive: true,
  //         isAuthenticationRequired: false,
  //       },
  //     },
  //   ]);

  //   // Set up notification response handler
  //   const subscription = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="(app)" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}