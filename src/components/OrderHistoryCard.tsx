import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import OrderItemCard from './OrderItemCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface OrderHistoryCardProps {
    navigationHandler: any;
    CartList: any;
    CartListPrice: string;
    OrderDate: string;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = (
    {
        navigationHandler,
        CartList,
        CartListPrice,
        OrderDate
    }
) => {
    const tabBarHeight = useBottomTabBarHeight();
    return (
        <View style={styles.CardContainer}>
            <View style={styles.CardHeader}>
                <View style={{justifyContent: 'flex-start'}}>
                    <Text style={styles.CardHeaderTitle}>Order Date</Text>
                    <Text style={styles.CardHeaderSubTitle}>{OrderDate}</Text>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                    <Text style={styles.CardHeaderTitle}>Total Amount</Text>
                    <Text style={[styles.CardHeaderSubTitle, {color: COLORS.primaryOrangeHex, alignItems: 'flex-end'}]}>${' '}{CartListPrice}</Text>
                </View>
            </View>
            <View style={styles.ListContainer}>
            {
                CartList.map((data: any, index: any) => (
                    <TouchableOpacity
                    key={index.toString() + data.id} 
                    onPress={() => {
                        navigationHandler({
                            index: data.index,
                            id: data.id,
                            type: data.type
                        });
                    }}
                    >
                        <OrderItemCard 
                        type ={data.type}
                        name ={data.name}
                        imagelink_square = {data.imagelink_square}
                        special_ingredient = {data.special_ingredient}
                        prices = {data.prices}
                        itemPrice = {data.itemPrice}
                        />
                    </TouchableOpacity>
                ))
            }
            </View>
        </View>
    )
}

export default OrderHistoryCard

const styles = StyleSheet.create({
    CardContainer: {
        gap: SPACING.space_10
    },
    CardHeader: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        gap: SPACING.space_20
    },
    CardHeaderTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex
    },
    CardHeaderSubTitle: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex
    },
    ListContainer: {
        gap: SPACING.space_20,
    }
})