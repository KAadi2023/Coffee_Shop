import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcon from '../components/CustomIcon'
import CoffeeCard from '../components/CoffeeCard'

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    }
    else {
      temp[data[i].name] += 1;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
}

const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  }
  else {
    let CoffeeList = data.filter((item: any) => item.name === category);
    return CoffeeList;
  }
}


const HomeScreen = ({ navigation }: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeansList = useStore((state: any) => state.BeansList);

  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0]
  })
  const [sortedCoffees, setSortedCoffees] = useState(getCoffeeList(categoryIndex.category, CoffeeList));

  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0
      });
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffees([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()))
      ]);
    }
  }

  const resetSearchCoffees = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffees([
      ...CoffeeList
    ]);
    setSearchText('');
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar />

        <Text style={styles.ScreenTitle}>Find the best{'\n'}Coffee for you</Text>

        {/* Serach Input  */}
        <View style={styles.SearchInputContainer}>
          <TouchableOpacity onPress={() => {
            searchCoffee(searchText)
          }}>
            <CustomIcon
              name='search'
              color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_18}
              style={styles.InputIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder='Find your coffee here...'
            value={searchText}
            onChangeText={text => {
              setSearchText(text)
              searchCoffee(searchText)
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {
            searchText.length > 0 ?
              <TouchableOpacity onPress={() => {
                resetSearchCoffees();
              }}>
                <CustomIcon style={styles.InputIcon} name='close' size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex} />
              </TouchableOpacity> : <></>
          }
        </View>

        {/* Categoties Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollView}
        >
          {
            categories.map((data, index) => (
              <View key={index.toString()} style={styles.CategoriesScrollViewContainer}>
                <TouchableOpacity
                  style={styles.CategoriesTouchableOpacity}
                  onPress={() => {
                    ListRef?.current?.scrollToOffset({
                      animated: true,
                      offset: 0
                    })
                    setCategoryIndex({ index: index, category: categories[index] })
                    setSortedCoffees([...getCoffeeList(categories[index], CoffeeList)])
                  }}
                >
                  <Text
                    style={[
                      styles.CategoryText,
                      categoryIndex.index == index ? { color: COLORS.primaryOrangeHex, } : {}
                    ]}
                  >
                    {data}
                  </Text>
                  {
                    categoryIndex.index == index ?
                      (<View style={styles.ActiveCategory} />
                      ) : (
                        <></>
                      )
                  }
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>

        {/* Coffee FlatList */}

        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffees}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => {
              console.log('id: ' + item.id, 'index: ' + item.index, 'type: ' + item.type);

              navigation.push('Details', {
                id: item.id,
                index: item.index,
                type: item.type,
              })
            }}>
              <CoffeeCard
                id={item.id}
                name={item.name}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={() => { }} />
            </TouchableOpacity>
          }}
        />

        <Text style={styles.CoffeBeansTitle}>Coffee Beans</Text>
        {/* Beans FlatList */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeansList}
          contentContainerStyle={[styles.FlatListContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => {
              navigation.push('Details', {
                id: item.id,
                index: item.index,
                type: item.type,
              })
            }}>
              <CoffeeCard
                id={item.id}
                name={item.name}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={() => { }} />
            </TouchableOpacity>
          }}
        />

      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    // backgroundColor: 'white'
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30
  },
  SearchInputContainer: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoriesScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,

  },
  CategoriesTouchableOpacity: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  CoffeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20
  },
})