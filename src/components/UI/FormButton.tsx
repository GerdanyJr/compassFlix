import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface FormButtonProps {
    title: string,
    onPress: () => void
}

export function FormButton(props: FormButtonProps): JSX.Element {
    return (
        <Pressable style={styles.button} onPress={props.onPress}>
            <Text style={styles.title}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E9A6A6',
        borderRadius: 30
    },
    title: {
        color: '#1f1d36',
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 8,
    }
});