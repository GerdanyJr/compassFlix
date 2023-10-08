import React from 'react';
import { Dimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { Cast } from './Cast';
import { Suggested } from './Suggested';
import { Actor } from '../../types/Actor';
import { LoadingOverlay } from '../UI/LoadingOverlay';
import { MovieDetails } from './MovieDetails';
import { Movie } from '../../types/Movie';

interface FooterTabProps {
    castMembers: Actor[];
    movieId: string;
    movie: Movie;
}

type Route = {
    key: string;
    name: string;
};

export function FooterTab({ castMembers, movieId, movie }: FooterTabProps) {
    const [index, setIndex] = React.useState(0);

    const renderScene = ({ route }: { route: Route }) => {
        switch (route.key) {
            case 'MovieDetails':
                return <MovieDetails movie={movie} />;
            case 'Cast':
                return <Cast cast={castMembers} />;
            case 'Suggestions':
                return <Suggested movieId={movieId} />;
            default:
                return null;
        }
    };

    const [routes] = React.useState([
        { key: 'MovieDetails', title: 'Detalhes', name: "MovieDetails" },
        { key: 'Cast', title: 'Elenco', name: "Cast" },
        { key: 'Suggestions', title: 'Títulos Semelhantes', name: "Suggestions" }
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#e50913' }}
            labelStyle={{ fontWeight: '700', textAlign: 'center' }}
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
            style={{ marginHorizontal: 14 }}
            renderLazyPlaceholder={() => <LoadingOverlay />}
        />
    );
}