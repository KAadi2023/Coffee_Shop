import { ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native';
import GradientBGIcon from './GradientBGIcon';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imagelink_square: ImageProps;
    type: string;
    id: string;
    favourite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler: any;
    ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler,
    imagelink_square,
    type,
    id,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,
}) => {
    console.log('image Links', imagelink_square);

    return (
        <View>
            <ImageBackground source={imagelink_square} style={styles.ItemBackgroundImage}>
                {
                    EnableBackHandler ?
                        (
                            <View style={styles.ImageHeaderBarContainerWithBack}>
                                <TouchableOpacity onPress={() => BackHandler()}>
                                    <GradientBGIcon name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => ToggleFavourite(favourite, type, id)
                                }>
                                    <GradientBGIcon name='like' color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.ImageHeaderBarContainerWithoutBack}>
                                <TouchableOpacity onPress={() => ToggleFavourite(favourite, id, type)}>
                                    <GradientBGIcon name='like' color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                                </TouchableOpacity>
                            </View>
                        )
                }
                <View style={styles.ImageInfoOuterContainer}>
                    <View style={styles.ImageInfoInnerContainer} >
                        <View style={styles.InfoContainerRow}>
                            <View>
                                <Text style={styles.ItemTitleText}>{name}</Text>
                                <Text style={styles.ItemSubTitleText}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.ItemPropertiesContainer}>
                                <View style={styles.ProperFirst}>
                                    <CustomIcon name={type === 'Bean' ? 'bean' : 'beans'} size={type === 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24} color={COLORS.primaryOrangeHex} />
                                    <Text style={[styles.PropertyFirstText, { marginTop: type === 'Bean' ? SPACING.space_4 + SPACING.space_2 : 0 }]}>
                                        {type}
                                    </Text>
                                </View>
                                <View style={styles.ProperFirst}>
                                    <CustomIcon name={type === 'Bean' ? 'location' : 'drop'} size={FONTSIZE.size_16} color={COLORS.primaryOrangeHex} />
                                    <Text style={styles.PropertyLastText}>
                                        {ingredients}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.InfoContainerRow}>
                            <View style={styles.RatingContainer}>
                                <CustomIcon name='star' color={COLORS.primaryOrangeHex} size={FONTSIZE.size_20}/>
                                <Text style={styles.RatingText}>{average_rating}</Text>
                                <Text style={styles.RatingCount}>({ratings_count})</Text>
                            </View>
                            <View style={styles.RoastedContainer}>
                                <Text style={styles.RoastedLabelText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}

export default ImageBackgroundInfo

const styles = StyleSheet.create({
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between'
    },
    ImageHeaderBarContainerWithBack: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_25,
    },
    ImageHeaderBarContainerWithoutBack: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        padding: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_25,
    },
    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
        backgroundColor: COLORS.primaryBlackRGBA,
    },
    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    ItemTitleText: {
        fontSize: FONTSIZE.size_24,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
    },
    ItemSubTitleText: {
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_medium,
    },
    ItemPropertiesContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        gap: SPACING.space_20
    },
    ProperFirst: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: BORDERRADIUS.radius_15,
    },
    PropertyFirstText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.secondaryLightGreyHex,
    },
    PropertyLastText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.secondaryLightGreyHex,
        marginTop: SPACING.space_2 + SPACING.space_4
    },
    RatingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.space_10
    },
    RatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    RatingCount: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    RoastedContainer: {
        height: 55,
        width: 55 * 2 + SPACING.space_20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: BORDERRADIUS.radius_15,
    },
    RoastedLabelText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    }

})