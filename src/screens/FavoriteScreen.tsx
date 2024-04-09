import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import FavouriteItem from '../components/FavouriteItem'

const FavoriteScreen = ({ navigation }: any) => {
  const tabBarHeight = useBottomTabBarHeight();

  const FavotitesList = useStore((state: any) => state.FavotitesList);

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList)

  const removeFromFavoriteList = useStore((state: any) => state.removeFromFavoriteList)

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? removeFromFavoriteList(type, id) : addToFavoriteList(type, id)
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewFlex} >
        <View style={[styles.ScrollViewInnerView,
        {
          marginBottom: tabBarHeight
        }
        ]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Favourites' />
            {
              FavotitesList.length === 0 ? <EmptyListAnimation title='No Favourites' /> : (
                <View style={styles.ListItemContainer}>
                  {
                    FavotitesList.map((data: any) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.push("Details", {
                            id: data.id,
                            index: data.index,
                            type: data.type,
                          })
                        }}
                        key={data.id}
                      >
                        <FavouriteItem
                          id={data.id}
                          type={data.type}
                          name={data.name}
                          imagelink_portrait={data.imagelink_portrait}
                          favourite={data.favourite}
                          special_ingredient={data.special_ingredient}
                          ingredients={data.ingredients}
                          average_rating={data.average_rating}
                          ratings_count={data.ratings_count}
                          roasted={data.roasted}
                          description={data.description}
                          ToggleFavouriteItem={ToggleFavourite}
                        />
                      </TouchableOpacity>
                    ))
                  }
                </View>
              )
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20
  },
})