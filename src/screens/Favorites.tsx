import React, { useContext } from 'react';

import { StyleSheet, Text, View } from "react-native";

export function Favorites(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text>Favorites</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});