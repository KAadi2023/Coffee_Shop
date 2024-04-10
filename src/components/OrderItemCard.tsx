import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface OrderItemCardProps {
    type: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    prices: any;
    itemPrice: string;
}
const OrderItemCard: React.FC<OrderItemCardProps> = ({
    type,
    name,
    imagelink_square,
    special_ingredient,
    prices,
    itemPrice
}) => {
    console.log("type: ", type);
    console.log("ItemPrice: ", itemPrice)
    console.log("prices: ", prices);

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style={styles.CardLinearGradient}
        >
            <View style={styles.Container}>
                <View style={styles.FirstRowContainer}>
                    <View style={styles.DetailsContainer}>
                        <Image
                            source={imagelink_square}
                            style={styles.CardImage}
                        />
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.CardTitle}>
                                {name}
                            </Text>
                            <Text style={styles.CardSubTitle}>
                                {special_ingredient}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.PriceContainer}>
                        <Text style={styles.CardPrice}>
                            $ <Text style={styles.CardPriceText}>{itemPrice}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.SecondRowContainer}>
                    {
                        prices.map((data: any, index: any) => (
                            <View
                                key={index.toString()}
                                style={styles.CardTableRowContainer}
                            >
                                <View style={[styles.CardTableRow, { gap: SPACING.space_2 }]}>
                                    <View style={styles.SizeContainerLeft}>
                                        <Text style={[styles.SizeText, {
                                            fontSize: type === 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16
                                        }]}>{data.size}</Text>
                                    </View>
                                    <View style={styles.PriceContainerRight}>
                                        <Text style={styles.currencyText}>{data.currency}</Text>
                                        <Text style={styles.priceText}>{data.price}</Text>
                                    </View>
                                </View>
                                <View style={styles.CardTableRow}>
                                    <Text style={styles.Quantity}>X{' '}
                                        <Text style={styles.QuantityText}>{data.quantity}</Text></Text>
                                </View>
                                <View style={styles.CardTableRow}>
                                    <Text style={styles.PricePerRow}>{
                                        Number(data.quantity) * Number(data.price)
                                    }</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </View>

        </LinearGradient>
    )
}

export default OrderItemCard

const styles = StyleSheet.create({
    CardLinearGradient: {
        borderRadius: BORDERRADIUS.radius_15,
    },
    Container: {
        padding: SPACING.space_20,
        gap: SPACING.space_15
    },
    FirstRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    CardImage: {
        width: 60,
        height: 60,
        borderRadius: BORDERRADIUS.radius_10
    },
    DetailsContainer: {
        flexDirection: 'row',
        gap: SPACING.space_20
    },
    CardTitle: {
        fontSize: FONTSIZE.size_14,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex
    },
    CardSubTitle: {
        fontSize: FONTSIZE.size_12,
        fontFamily: FONTFAMILY.poppins_regular,
        color: COLORS.secondaryLightGreyHex
    },
    PriceContainer: {
        alignItems: 'flex-end'
    },
    CardPrice: {
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryOrangeHex
    },
    CardPriceText: {
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex
    },
    SecondRowContainer: {
        flex: 1,
    },
    CardTableRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.space_4 + SPACING.space_2
    },
    CardTableRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeContainerLeft: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 60,
        height: 40,
        borderTopLeftRadius: BORDERRADIUS.radius_10,
        borderBottomLeftRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex
    },
    PriceContainerRight: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 90,
        height: 40,
        borderTopRightRadius: BORDERRADIUS.radius_10,
        borderBottomRightRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: SPACING.space_4
    },
    currencyText: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex
    },
    priceText: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex
    },
    Quantity: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex
    },
    QuantityText: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex
    },
    PricePerRow: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex
    },
})