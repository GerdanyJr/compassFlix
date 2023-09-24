import React, { useContext, useState } from 'react';
import { Alert, Image, ImageBackground, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { InputField } from '../components/InputField';
import { FormButton } from '../components/UI/FormButton';
import { LoginHeader } from '../components/LoginHeader';
import { Redirect } from '../components/UI/Redirect';
import { login } from '../services/auth';
import { AuthContext } from '../store/AuthContext';

interface FormValues {
    email: string,
    password: string
}

export function Login({ navigation }: { navigation: any }): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const authCtx = useContext(AuthContext);
    const { control, handleSubmit } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    async function handleLogin(data: FormValues) {
        try {
            setIsLoading(true);
            const response = await login(data.email, data.password);
            const token = await response.user.getIdToken();
            authCtx.authenticate(response.user, token);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    }
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
                    name='password'
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
                <Redirect
                    text='Não possui uma conta? Cadastre-se'
                    onPress={() => { navigation.navigate('SignUp') }}
                />
                <FormButton
                    title='Entrar'
                    isLoading={isLoading}
                    onPress={handleSubmit((formValues: FormValues) => handleLogin(formValues))}
                />
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