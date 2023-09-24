import React, { useState } from 'react';
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Modal, StyleSheet, Text, View } from 'react-native';
import { InputField } from '../components/InputField';
import { FormButton } from '../components/UI/FormButton';
import { Controller, useForm } from 'react-hook-form';
import { LoginHeader } from '../components/LoginHeader';
import { Redirect } from '../components/UI/Redirect';
import { signUp } from '../services/auth';

interface FormValues {
    email: string,
    username: string,
    password: string
}

export function SignUp({ navigation }: { navigation: any }): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { control, handleSubmit } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            username: '',
            password: ''
        }
    });

    async function handleSignup(data: FormValues) {
        try {
            setIsLoading(true);
            await signUp(data.email, data.password, data.username);
            navigation.navigate('Login');
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
                <LoginHeader title='Cadastre-se' />
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
                    name='username'
                    rules={{
                        required: true,
                        minLength: 5
                    }}
                    render={({ fieldState, field: { onChange, value, name } }) =>
                        <InputField
                            iconName='person-outline'
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
                    onPress={() => { navigation.navigate('Login') }}
                />
                <FormButton
                    title='Cadastrar'
                    isLoading={isLoading}
                    onPress={handleSubmit((data) => handleSignup(data))}
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