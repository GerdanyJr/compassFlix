import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface RedirectProps {
    text: string,
    onPress: () => void
}

export function Redirect(props: RedirectProps): JSX.Element {
    return (
        <Pressable onPress={props.onPress}>
            <Text style={styles.signUpText}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    signUpText: {
        color: 'white',
    }
});