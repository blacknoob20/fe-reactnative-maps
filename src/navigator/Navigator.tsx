import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { PermissionsContext } from '../../context/PermissionsContext';
import { LoadingScreen } from '../pages/LoadingScreen';
import { MapScreen } from '../pages/MapScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
    const theme = useColorScheme();
    const { permissions } = useContext(PermissionsContext);

    if (permissions.locationStatus === 'unavailable') return <LoadingScreen />;

    return (
        <Stack.Navigator
            initialRouteName='PermissionsScreen'
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: (theme === 'dark' ? 'rgb(0,0,0)' : 'rgb(255,255,255)'),
                }
            }}
        >
            {
                (permissions.locationStatus === 'granted')
                    ? <Stack.Screen name="MapScreen" component={MapScreen} />
                    : <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
            }
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
    );
}