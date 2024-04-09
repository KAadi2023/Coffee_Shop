import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface PaymentMethodProps {
    paymentMode: string;
    icon: ImageProps;
    isIcon: boolean;
    name: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
    paymentMode,
    icon,
    isIcon,
    name,
}) => {
    return (
        <View style={styles.PaymentCardContainer}>
            {
                isIcon ?
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                        style={[styles.PaymentCardLinearGradientWallet, {
                            borderColor: paymentMode === name ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex
                        }]}
                    >
                        <View style={styles.PaymentCardDetailsContainer}>
                            <CustomIcon
                                name={'wallet'}
                                color={COLORS.primaryOrangeHex}
                                size={FONTSIZE.size_30}
                            />
                            <Text style={styles.PaymentCardTitle}>
                                {name}
                            </Text>
                        </View>
                        <Text style={styles.PaymentCardPrice}>$ 100.50</Text>
                    </LinearGradient>
                    :
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                        style={[styles.PaymentCardLinearGradientRegular, {
                            borderColor: paymentMode === name ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex
                        }]}
                    >

                        <Image
                            source={icon}
                            style={styles.PaymentCardImage}
                            resizeMode='cover'
                        />
                        <Text style={styles.PaymentCardTitle}>
                            {name}
                        </Text>
                    </LinearGradient>
            }
        </View>
    )
}

export default PaymentMethod

const styles = StyleSheet.create({
    PaymentCardContainer: {
        backgroundColor: COLORS.primaryGreyHex,
        borderRadius: BORDERRADIUS.radius_15 * 2,
        borderWidth: 3,
    },
    PaymentCardLinearGradientWallet: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.space_24,
        gap: SPACING.space_24,
        borderRadius: BORDERRADIUS.radius_15 * 2,
        borderWidth: 3
    },
    PaymentCardDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_15,
    },
    PaymentCardTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    PaymentCardPrice: {
        fontFamily: FONTFAMILY.poppins_regular,
        color: COLORS.secondaryLightGreyHex,
        fontSize: FONTSIZE.size_16,
    },
    PaymentCardLinearGradientRegular: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.space_24,
        gap: SPACING.space_24,
        borderRadius: BORDERRADIUS.radius_15 * 2,
        borderWidth: 3
    },
    PaymentCardImage: {
        width: SPACING.space_30,
        height: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_15 * 2,
    },
})