import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Actor } from '../../types/Actor';
import { Pressable } from 'react-native';

export function Cast({ cast }: { cast: Actor[] }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={cast}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CastMember member={item} />}
            />
        </View>
    );
}

function CastMember({ member }: { member: Actor }) {
    return (
        <Pressable style={styles.actorContainer} onPress={() => console.log(member.id)}>
            <Image source={{ uri: member.profile_path ? 'https://image.tmdb.org/t/p/w300/' + member.profile_path : 'https://th.bing.com/th/id/OIP.pBdGhoOirYa8mYUGzwn8fgAAAA?pid=ImgDet&rs=1' }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.charName}>{member.character}</Text>
                <Text style={styles.actorName}>{member.original_name}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8
    },
    actorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 30
    },
    infoContainer: {
        paddingHorizontal: 10
    },
    charName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    actorName: {
        fontSize: 12,
        color: 'white'
    }
});