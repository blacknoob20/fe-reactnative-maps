import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, useColorScheme, ViewStyle } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const Button = ({ title, onPress, style }: Props) => {
    const theme = useColorScheme();
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={{
                ...style as any,
                ...styles.blackButton,
                backgroundColor: (theme === 'dark' ? 'rgb(80,80,80)' : 'rgb(0,0,0)'),
                shadowColor: (theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)'),
            }}
        >
            <Text style={{
                ...styles.buttonText,
                color: (theme === 'dark' ? 'rgb(0,0,0)' : 'rgb(255,255,255)'),
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blackButton: {
        height: 50,
        width: 200,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        elevation: 6,
    },
    buttonText: {
        fontSize: 18,
    }
});