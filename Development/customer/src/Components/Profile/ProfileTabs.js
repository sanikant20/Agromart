import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Profile from './Profile';
import Orders from './Orders';
import Colors from '../../colors';

const renderScene = SceneMap({
    first: Profile,
    second: Orders
});

export default function ProfileTabs() {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    
    const [routes] = useState([
        {
            key: "first",
            title: "PROFILE"
        },
        {
            key: "second",
            title: "MY ORDERS"
        }
    ]);

    const renderTabsBar = (props) => (
        <TabBar
            {...props}
            tabStyle={styles.tabStyle}
            indicatorStyle={{ backgroundColor: Colors.black }}
            activeColor={Colors.main}
            inactiveColor={Colors.white}
            renderLabel={({ route, color }) => 
                <Text style={{ color, ...styles.text }}>
                    {route.title}
                </Text>
            }
        />
    );

    return (
        <TabView 
            navigationState={{ index, routes }} 
            renderScene={renderScene}
            renderTabBar={renderTabsBar}
            onIndexChange={setIndex} 
            initialLayout={{ width: layout.width }}
        />
    );
}

const styles = StyleSheet.create({
    tabStyle: {
        backgroundColor: "lightgrey",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold"
    }
});
