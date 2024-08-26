import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Profile from './Profile';
import Orders from './Orders';
import Colors from '../../colors';

// Renders scene
const renderScene = SceneMap({
    first: Profile,
    second: Orders
});

export default function ProfileTabs() {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    
    // State to manage render items
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

    // Profile tab renders
    const renderTabsBar = (props) => (
        <TabBar
            {...props}
            tabStyle={styles.tabStyle}
            indicatorStyle={{ backgroundColor: Colors.black }}
            activeColor={Colors.white}
            inactiveColor={Colors.black}
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
        backgroundColor: "green",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold"
    }
});
