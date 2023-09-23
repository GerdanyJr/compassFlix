import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

export function SignUp(): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <Image source={require('../images/Banner.png')} style={styles.imgBackground} />
                <Image source={require('../images/logo.png')} style={styles.logo} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    backgroundContainer: {
        alignItems: 'center'
    },
    imgBackground: {
        width: '100%',
        height: '60%'
    },
    logo: {
        bottom: '23%'
    }
});