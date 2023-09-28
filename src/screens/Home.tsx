import React, { useContext, useEffect, useState } from 'react';

import { FlatList, StyleSheet, View } from "react-native";
import { AuthContext } from '../store/AuthContext';
import { HomeHeader } from '../components/Home/HomeHeader';
import { MoviesScroll } from '../components/Home/MoviesScroll';
import { urls } from '../util/urls';
import { getCategories } from '../services/moviesHttp';
import { Categories } from '../types/Categories';

export function Home({ navigation }: { navigation: any }): JSX.Element {
    const authCtx = useContext(AuthContext);
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const categories = await getCategories();
            setCategories(categories);
        }
        fetchCategories();
    }, [])

    return (
        <View style={styles.container}>
            <HomeHeader username={authCtx.user?.displayName!} />
            <FlatList
                data={categories}
                keyExtractor={(itemData) => itemData.id.toString()}
                ListHeaderComponent={ListHeader}
                renderItem={({ item }) => <MoviesScroll requestUrl={urls.moviesByGenre + item.id} title={`Principais em ${item.name}`} />}
                showsVerticalScrollIndicator={false}
                initialNumToRender={4}
                style={styles.scrollContainer}
            />
        </View>
    )
}

function ListHeader() {
    return (
        <>
            <MoviesScroll
                title='Próximos Lançamentos'
                requestUrl={urls.upComing}
            />
            <MoviesScroll
                title='Melhores Avaliados'
                requestUrl={urls.topRated}
            />
        </>
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