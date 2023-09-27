import React from 'react';
import { Dimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Cast } from './Cast';
import { Suggested } from './Suggested';

export function FooterTab() {
    const [index, setIndex] = React.useState(0);

    const renderScene = SceneMap({
        Suggestions: () => <Suggested />,
        Cast: () => <Cast />,
    });

    const [routes] = React.useState([
        { key: 'Suggestions', title: 'Sugestões' },
        { key: 'Cast', title: 'Elenco' }
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
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