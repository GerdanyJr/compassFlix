import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export function LoadingOverlay() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#e50913' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});