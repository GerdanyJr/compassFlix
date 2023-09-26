import React, { useContext } from 'react';

import { ScrollView, StyleSheet, View } from "react-native";
import { AuthContext } from '../../store/AuthContext';
import { HomeHeader } from './HomeHeader';
import { MoviesScroll } from './MoviesScroll';
import { urls } from '../../util/urls';

export function Home({ navigation }: { navigation: any }): JSX.Element {
    const authCtx = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <HomeHeader username={authCtx.user?.displayName!} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                <MoviesScroll
                    title='Próximos Lançamentos'
                    requestUrl={urls.upComing}
                />
                <MoviesScroll
                    title='Melhores Avaliados'
                    requestUrl={urls.topRated}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContainer: {
        marginTop: 8,
        gap: 80
    }
});