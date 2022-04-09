import styled from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { View } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import Search from '../screens/Search';
import Favorite from '../screens/Favorite';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

const Container = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    background: red;
    height: 80px;
`;

const BottomBar = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#081b25',
                    height: 80,
                    paddingBottom: 50,
                    borderTopWidth: 0,
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Feather name='home' size={28} color={focused ? '#FF73B9' : '#637989'} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Favorite'
                component={Favorite}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <AntDesign name='hearto' size={28} color={focused ? '#FF73B9' : '#637989'} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <AntDesign name='search1' size={28} color={focused ? '#FF73B9' : '#637989'} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Settings'
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Feather name='bar-chart-2' size={28} color={focused ? '#FF73B9' : '#637989'} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomBar;
