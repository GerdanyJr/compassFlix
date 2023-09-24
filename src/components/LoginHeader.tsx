import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface LoginHeaderProps {
    title: string,
    subtitle?: string
}

export function LoginHeader(props: LoginHeaderProps): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'
    },
    subtitle: {
        color: 'white'
    }
});