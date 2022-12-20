import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { PermissionsContext } from '../../context/PermissionsContext';
import { Button } from '../components/Button';

export const PermissionsScreen = () => {
    const { permissions, askLocationPermission } = useContext(PermissionsContext);

    return (
        <View style={styles.container}>
            <Text>Permissions Screen</Text>
            <Button
                title='Permiso'
                onPress={askLocationPermission}
            />
            <Text>{JSON.stringify(permissions, null, 4)}</Text>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});