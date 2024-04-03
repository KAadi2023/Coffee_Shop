import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Screens
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import FavoriteScreen from '../screens/FavoriteScreen'

//CustomIcon
import CustomIcon from '../components/CustomIcon'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarBackground: () => (
                <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles} />
            )
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused, color, size }) => (
                        <CustomIcon name="home" color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({focused, color, size }) => (
                        <CustomIcon name="cart" color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name='Favorite'
                component={FavoriteScreen}
                options={{
                    tabBarIcon: ({focused, color, size }) => (
                        <CustomIcon name="like" color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="History"
                component={OrderHistoryScreen}
                options={{
                    tabBarIcon: ({focused, color, size }) => (
                        <CustomIcon name="bell" color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent'
    },
    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})