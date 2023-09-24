import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LoginHeader } from '../components/LoginHeader';
import { InputField } from '../components/InputField';
import { FormButton } from '../components/FormButton';

export function SignUp(): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <Image source={require('../assets/images/Banner.png')} style={styles.imgBackground} />
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            </View>
            <LoginHeader title='Login' subtitle='Entre na sua conta para continuar.' />
            <View style={styles.form}>
                <InputField iconName='person' placeholder='email' invalid={true} />
                <InputField iconName='lock-closed-outline' placeholder='senha' />
                <FormButton title='Entrar' onPress={() => {}} />
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
        alignItems: 'center',
        height: 400
    },
    imgBackground: {
        width: '100%',
        height: '100%'
    },
    logo: {
        bottom: '45%'
    },
    form: {
        marginTop: 28,
        alignItems: 'center',
        gap: 14
    }
});