import { ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface FavouriteItemProps {
    id: string;
    type: string;
    name: string;
    imagelink_portrait: ImageProps;
    favourite: boolean;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    description: string;
    ToggleFavouriteItem: any;
}

const FavouriteItem: React.FC<FavouriteItemProps> = ({
    id,
    type,
    name,
    imagelink_portrait,
    favourite,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    description,
    ToggleFavouriteItem,
}) => {
    return (
        <View style={styles.Container}>
            <ImageBackgroundInfo
                EnableBackHandler={false}
                imagelink_portrait={imagelink_portrait}
                type={type}
                id={id}
                favourite={favourite}
                name={name}
                special_ingredient={special_ingredient}
                ingredients={ingredients}
                average_rating={average_rating}
                ratings_count={ratings_count}
                roasted={roasted}
                ToggleFavourite={ToggleFavouriteItem}
            />
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.LinearGradientContainer}
            >
                <Text style={styles.DescriptionLable}>Description</Text>
                <Text style={styles.DescriptionText}>{description}</Text>
            </LinearGradient>
        </View>
    )
}

export default FavouriteItem

const styles = StyleSheet.create({
    Container: {
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden',
    },
    LinearGradientContainer: {
        gap:SPACING.space_10,
        padding: SPACING.space_10,
    },
    DescriptionLable: {
        color: COLORS.secondaryLightGreyHex,
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_semibold
    },
    DescriptionText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        fontFamily: FONTFAMILY.poppins_regular,
    },
})