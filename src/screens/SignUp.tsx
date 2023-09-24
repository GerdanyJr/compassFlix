import React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { InputField } from '../components/InputField';
import { FormButton } from '../components/FormButton';
import { Controller, useForm } from 'react-hook-form';
import { LoginHeader } from '../components/LoginHeader';

interface FormValues {
    email: string,
    senha: string
}

export function SignUp(): JSX.Element {
    const { control, handleSubmit } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            senha: ''
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <ImageBackground source={require('../assets/images/Banner.png')} resizeMode='cover' style={styles.imageBackground}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                </ImageBackground>
            </View>
            <KeyboardAvoidingView style={styles.form} behavior='height'>
                <LoginHeader title='Login' subtitle='Entre na sua conta para continuar.' />
                <Controller
                    control={control}
                    name='email'
                    rules={{
                        required: true,
                        pattern: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
                    }}
                    render={({ fieldState, field: { onChange, value, name } }) =>
                        <InputField
                            iconName='at'
                            placeholder={name}
                            invalid={fieldState.invalid}
                            onChange={onChange}
                            value={value}
                        />}
                />
                <Controller
                    control={control}
                    name='senha'
                    rules={{
                        required: true,
                        minLength: 8
                    }}
                    render={({ fieldState, field: { onChange, value, name } }) =>
                        <InputField
                            iconName='lock-closed-outline'
                            placeholder={name}
                            invalid={fieldState.invalid}
                            onChange={onChange}
                            value={value}
                            secureTextEntry
                        />}
                />
                <FormButton title='Entrar' onPress={handleSubmit(() => console.log("Enviado"))} />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    backgroundContainer: {
        width: '100%',
        height: '50%'
    },
    imageBackground: {
        alignItems: 'center',
        height: '100%'
    },
    logo: {
        top: '55%'
    },
    form: {
        marginTop: 28,
        alignItems: 'center',
        gap: 14
    }
});