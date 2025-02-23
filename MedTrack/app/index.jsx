// import { Redirect } from 'expo-router';

// export default function Index() {
//   return <Redirect href="/auth/SignIn" />;
// }




import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      setInitialRoute(userData ? '/(app)/Home' : '/auth/SignIn');
    } catch (error) {
      setInitialRoute('/auth/SignIn');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#192f6a" />
      </View>
    );
  }

  return <Redirect href={initialRoute} />;
}