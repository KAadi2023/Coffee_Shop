import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface CartItemProps {
    id: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    roasted: string;
    prices: any;
    type: string;
    incrementCartitemQuantityHandler: any;
    decrementCartitemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    imagelink_square,
    special_ingredient,
    roasted,
    prices,
    type,
    incrementCartitemQuantityHandler,
    decrementCartitemQuantityHandler
}) => {
    return (
        <View style={styles.CartItemContainer}>
            {
                prices.length != 1 ?
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}
                        style={styles.CartItemLinearGradient}
                    >
                        <View style={styles.CartItemDetailsContainer}>
                            <Image
                                source={imagelink_square}
                                style={styles.CartItemImage}
                                resizeMode='cover'
                            />
                            <View style={styles.CartItemInfo}>
                                <View>
                                    <Text style={styles.ItemTitle}>{name}</Text>
                                    <Text style={styles.ItemSubTitle}>{special_ingredient}</Text>
                                </View>
                                <View style={styles.ItemRoastedContainer}>
                                    <Text style={styles.ItemRoastedText}>
                                        {roasted}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {
                            prices.map((data: any, index: any) => (
                                <View
                                    key={index.toString()}
                                    style={styles.CartItemSizeRoeContainer}
                                >
                                    <View style={styles.CartItemSizeValueContainer}>
                                        <View style={styles.SizeBox}>
                                            <Text style={[styles.SizeText, { fontSize: type == "Bean" ? FONTSIZE.size_12 : FONTSIZE.size_16 }]}>{data.size}</Text>
                                        </View>
                                        <Text style={styles.SizeCurrency}>
                                            {data.currency}{' '}
                                            <Text style={styles.SizePrice}>{data.price}</Text>
                                        </Text>
                                    </View>
                                    <View style={styles.CartItemSizeValueContainer}>
                                        <TouchableOpacity style={styles.CartItemIcon}
                                            onPress={() => {
                                                decrementCartitemQuantityHandler(id, data.size)
                                            }}
                                        >
                                            <CustomIcon name='minus' color={'white'} size={FONTSIZE.size_10} />
                                        </TouchableOpacity>
                                        <View style={styles.ItemQuantityContainer}>
                                            <Text style={styles.QuantityText}>{data.quantity}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.CartItemIcon}
                                            onPress={() => {
                                                incrementCartitemQuantityHandler(id, data.size)
                                            }}
                                        >
                                            <CustomIcon name='add' color={'white'} size={FONTSIZE.size_10} />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            ))
                        }
                    </LinearGradient>
                    :
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}
                        style={styles.CartItemLinearGradient}
                    >
                        <View style={styles.CartItemDetailsContainer}>
                            <Image
                                source={imagelink_square}
                                style={styles.CartItemImage}
                                resizeMode='cover'
                            />
                            <View style={styles.CartItemInfo}>
                                <View>
                                    <Text style={styles.ItemTitle}>{name}</Text>
                                    <Text style={styles.ItemSubTitle}>{special_ingredient}</Text>
                                </View>
                                <View style={styles.CartSingleItemInfo}>
                                    <View style={styles.ItemSizeContainer}>
                                        <Text style={[styles.SizeText, { fontSize: type == "Bean" ? FONTSIZE.size_12 : FONTSIZE.size_16 }]}>
                                            {prices[0].size}
                                        </Text>
                                    </View>
                                    <Text style={styles.SizeCurrency}>
                                        {prices[0].currency}{' '}
                                        <Text style={styles.SizePrice}>{prices[0].price}</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
            }
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    CartItemContainer: {
        flex: 1,
    },
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemDetailsContainer: {
        flexDirection: 'row',
        gap: SPACING.space_12,
        flex: 1
    },
    CartItemImage: {
        width: 130,
        height: 130,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between'
    },
    ItemTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    ItemSubTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    ItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    ItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSizeRoeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: SPACING.space_20,
    },
    CartItemSizeValueContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    SizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_16
    },
    SizePrice: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16
    },
    CartItemIcon: {
        width: 30,
        height: 30,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryOrangeHex,
    },
    ItemQuantityContainer: {
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
        borderColor: COLORS.primaryOrangeHex,
        borderWidth: 2,
        paddingVertical: SPACING.space_4
    },
    QuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CartSingleItemInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.space_12,
    },
    ItemSizeContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    }
})