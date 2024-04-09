import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface OrderHistoryCardProps {
    navigationHandler: any;
    CartItems: any;
    CartListPrice: string;
    OrderDate: string;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = (
    {
        navigationHandler,
        CartItems,
        CartListPrice,
        OrderDate
    }
) => {
    return (
        <View style={styles.CardContainer}>
            <View style={styles.CardHeader}>
                <View style={{justifyContent: 'flex-start'}}>
                    <Text style={styles.CardHeaderTitle}>Order Date</Text>
                    <Text style={styles.CardHeaderSubTitle}>{OrderDate}</Text>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                    <Text style={styles.CardHeaderTitle}>Total Amount</Text>
                    <Text style={[styles.CardHeaderSubTitle, {color: COLORS.primaryOrangeHex}]}>${' '}{CartListPrice}</Text>
                </View>
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
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex
    }
})