import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import ImageBackgroundInfo from '../components/ImageBackgroundInfo'
import PaymentFooter from '../components/PaymentFooter'

const DetailsScreen = ({ navigation, route }: any) => {
  const [fullDesc, setFullDesc] = useState(false)

  const ItemOfIndex = useStore((state: any) => route.params.type === 'Coffee' ? state.CoffeeList : state.BeansList)[route.params.index]

  const [price, setPrice] = useState(ItemOfIndex.prices[0])

  const BackHandler = () => {
    navigation.pop();
  }
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList)
  const removeFromFavoriteList = useStore((state: any) => state.removeFromFavoriteList)

  const addToCart = useStore((state: any) => state.addToCart)

  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? removeFromFavoriteList(type, id) : addToFavoriteList(type, id)
  }

  console.log("ItemOfIndex>>>>>", ItemOfIndex)
  console.log("type of addToCart", typeof addToCart)
  console.log("type of calculateCartPrice", typeof calculateCartPrice)
  console.log("type of removeFromFavoriteList", typeof removeFromFavoriteList)

  const AddToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }]
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  }


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_square={ItemOfIndex.imagelink_square}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.DescriptionLable}>Description</Text>
          {
            fullDesc ?
              (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setFullDesc(prev => !prev)
                  }}
                >
                  <Text style={styles.DescriptionText}>{ItemOfIndex.description}</Text>
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setFullDesc(prev => !prev)
                  }}
                >
                  <Text style={styles.DescriptionText} numberOfLines={3}>{ItemOfIndex.description}</Text>
                </TouchableWithoutFeedback>
              )
          }
          <Text style={styles.SizeLable}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {
              ItemOfIndex.prices.map((data: any) => (
                <TouchableOpacity key={data.size} style={[styles.SizeBox, {
                  borderColor: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex
                }]}
                  onPress={() => setPrice(data)}>
                  <Text style={[styles.SizeText, {
                    fontSize: ItemOfIndex.type === "bean" ? FONTSIZE.size_14 : FONTSIZE.size_16,
                    color: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex
                  }]}>{data.size}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <PaymentFooter price={price} buttonTitle='Add to Cart' buttonPressHandler={() => {
            AddToCartHandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price
            })
          }
          }
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  DescriptionLable: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: SPACING.space_10
  },
  DescriptionText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    marginBottom: SPACING.space_10,
    letterSpacing: 0.5
  },
  SizeLable: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: SPACING.space_10
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20
  },
  SizeBox: {
    flex: 1,
    height: SPACING.space_24 * 2,
    borderRadius: SPACING.space_10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: COLORS.primaryDarkGreyHex
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  }

})