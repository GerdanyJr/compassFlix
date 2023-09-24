import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

interface FormButtonProps {
    title: string,
    isLoading?: boolean,
    onPress: () => void
}

export function FormButton(props: FormButtonProps): JSX.Element {
    return (
        <Pressable style={styles.button} onPress={props.onPress}>
            {props.isLoading ?
                <ActivityIndicator color='black' size={20} /> :
                <Text style={styles.title}>{props.title}</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E9A6A6',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    title: {
        color: '#1f1d36',
        fontWeight: 'bold',
        fontSize: 16,
    }
});