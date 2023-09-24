import React from "react";

import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface InputFieldProps {
    placeholder: string,
    iconName: string,
    invalid?: boolean
}

export function InputField(props: InputFieldProps): JSX.Element {
    return (
        <View style={styles.container}>
            <Ionicons name={props.iconName} color={props.invalid ? '#d73542' : '#a2a2a2'} />
            <TextInput placeholder={props.placeholder}
                style={styles.input}
                placeholderTextColor={props.invalid ? '#d73542' : '#a2a2a2'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        height: 33,
        borderRadius: 33,
        paddingHorizontal: 10,
        backgroundColor: '#454545',
    },
    input: {
        paddingVertical: 0,
        paddingHorizontal: 8,
        width: '90%'
    }
});