import React, { useContext } from 'react';

import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from '../store/AuthContext';

export function Home({ navigation }: { navigation: any }): JSX.Element {
    const authCtx = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
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