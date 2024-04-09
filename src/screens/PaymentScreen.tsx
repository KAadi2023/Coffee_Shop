import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import PaymentFooter from '../components/PaymentFooter'
import GradientBGIcon from '../components/GradientBGIcon'
import PaymentMethod from '../components/PaymentMethod'
import LinearGradient from 'react-native-linear-gradient'
import CustomIcon from '../components/CustomIcon'
import { useStore } from '../store/store'
import PopUpAnimation from '../components/PopUpAnimation'

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false
  },
]

const PaymentScreen = ({ navigation, route }: any) => {
  const [paymentMode, setPaymentMode] = useState('Credit Card')
  const [showAnimation, setShowAnimation] = useState(false)

  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore((state: any) => state.addToOrderHistoryListFromCart);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History')
    }, 2000);
  }

  console.log('showAnimation', showAnimation)
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {
        showAnimation ? (
          <PopUpAnimation
            style={styles.LottieAnimation}
            source={require('../lottie/successful.json')}
          />
        ) : (<></>)
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewFlex} >
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <GradientBGIcon name={'left'} size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex} />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView} />
        </View>

        <View style={styles.PaymentOptionContainer}>
          <TouchableOpacity
            onPress={() => setPaymentMode("Credit Card")}
          >
            <View style={[styles.CreditCardContainer,
            {
              borderColor: paymentMode === 'Credit Card' ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex
            }
            ]}
            >
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.CreditCard}
              >
                <View style={styles.CreditCardFirstRowContainer}>
                  <CustomIcon
                    name={'chip'}
                    color={COLORS.primaryOrangeHex}
                    size={FONTSIZE.size_20 * 2}
                  />
                  <CustomIcon
                    name={'visa'}
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_30 * 2}
                  />
                </View>
                <View style={styles.CreditCardNumberContainer}>
                  <Text style={styles.CreditCardNumber}>5896</Text>
                  <Text style={styles.CreditCardNumber}>8954</Text>
                  <Text style={styles.CreditCardNumber}>6985</Text>
                  <Text style={styles.CreditCardNumber}>4126</Text>
                </View>
                <View style={styles.CreditCardLastRowContainer}>
                  <View style={styles.CardNameContainer}>
                    <Text style={styles.CardHolderNameTitle}>Card Holder Name</Text>
                    <Text style={styles.CardHolderName}>Aditya Kumar</Text>
                  </View>
                  <View style={styles.CardDateContainer}>
                    <Text style={styles.CardHolderNameTitle}>Expire Date</Text>
                    <Text style={styles.CardHolderName}>02/30</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          {
            PaymentList.map((item: any) => {
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => {
                    setPaymentMode(item.name)
                  }}
                >
                  <PaymentMethod paymentMode={paymentMode} name={item.name} icon={item.icon} isIcon={item.isIcon} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
      <PaymentFooter
        buttonTitle={`${paymentMode}`}
        buttonPressHandler={buttonPressHandler}
        price={{ price: route.params.amount, currency: '$' }}
      />
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  LottieAnimation: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  PaymentOptionContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15,
    borderWidth: 3,
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  CreditCard: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_15,
  },
  CreditCardFirstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  CreditCardLastRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.space_4
  },
  CardHolderNameTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CardHolderName: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CardNameContainer: {
    alignItems: 'flex-start'
  },
  CardDateContainer: {
    alignItems: 'flex-end'
  },
})