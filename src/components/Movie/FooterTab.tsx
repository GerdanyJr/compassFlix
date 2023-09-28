import React from 'react';
import { Dimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Cast } from './Cast';
import { Suggested } from './Suggested';
import { Actor } from '../../types/Actor';

interface FooterTabProps {
    castMembers: Actor[],
    movieId: string
}

type Route = {
    key: string;
    name: string;
};

export function FooterTab({ castMembers, movieId }: FooterTabProps) {
    const [index, setIndex] = React.useState(0);

    const renderScene = ({ route }: { route: Route }) => {
        switch (route.key) {
            case 'Cast':
                return <Cast cast={castMembers} />;
            case 'Suggestions':
                return <Suggested movieId={movieId} />
            default:
                return null;
        }
    };

    const [routes] = React.useState([
        { key: 'Cast', title: 'Elenco', name: "Cast" },
        { key: 'Suggestions', title: 'Títulos Semelhantes', name: "Suggestions" }
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#e50913' }}
            labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
            style={{ backgroundColor: 'black' }}
        />
    );
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={renderTabBar}
            style={{ paddingHorizontal: 14 }}
        />
    );
}