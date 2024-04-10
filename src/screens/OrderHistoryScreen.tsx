import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderBar from '../components/HeaderBar'
import { COLORS, SPACING } from '../theme/theme'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useStore } from '../store/store'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PopUpAnimation from '../components/PopUpAnimation'
import OrderHistoryCard from '../components/OrderHistoryCard'

const OrderHistoryScreen = ({ navigation }: any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList)
  const [showAnimation, setShowAnimation] = useState(false)

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push("Details", {
      index, id, type
    })
  }

  const buttonPressHandler = () => {
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, 2000);
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <HeaderBar title='Order History' />
      {
        showAnimation ? (
          <PopUpAnimation
            style={styles.LottieAnimation}
            source={require('../lottie/download.json')}
          />
        ) : (<></>)
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewFlex} >
        <View style={[styles.ScrollViewInnerView,
        {
          marginBottom: tabBarHeight
        }
        ]}>
          <View style={styles.ItemContainer}>
            {/* <HeaderBar title='Order History' /> */}
            {
              OrderHistoryList.length === 0 ? <EmptyListAnimation title='No Order List' /> : (
                <View style={styles.ListItemContainer}>
                  {
                    OrderHistoryList.map((data: any, index: any) => (
                      <OrderHistoryCard
                        key={index.toString()}
                        navigationHandler={navigationHandler}
                        CartListPrice={data.CartListPrice}
                        CartList={data.CartList}
                        OrderDate={data.OrderDate}
                      />
                    ))
                  }
                </View>
              )
            }
          </View>
        </View>
      </ScrollView>
      {
        OrderHistoryList.length > 0 ?
          <TouchableOpacity
            onPress={() => {
              buttonPressHandler();
            }}
            style={[styles.DownloadButton, { marginBottom: tabBarHeight }]}
          >
            <Text style={styles.ButtonText}>Download</Text>
          </TouchableOpacity> : <></>
      }
    </View>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  LottieAnimation: {
    height: 250,
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
    gap: SPACING.space_30
  },
  DownloadButton: {
    width: '85%',
    height: 50,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.space_20,
  },
  ButtonText: {
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
    fontSize: SPACING.space_20,
  }
})