import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from '../../../constants/color'

const Welcome = () => {

    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Masonry Grid Images */}
      <View style={styles.gridContainer}>
        {/* Column 1 */}
        <View style={styles.column2}>
          <View style={[styles.imageBox, styles.box1]}>
            <Image 
            source={require('../../../assets/images/img3.png')} 
              style={styles.image}
            />
          </View>
          <View style={[styles.imageBox, styles.box4]}>
            <Image 
           source={require('../../../assets/images/img1.png')} 
              style={styles.image}
            />
          </View>
        </View>

        {/* Column 2 */}
        <View style={styles.column}>
          <View style={[styles.imageBox, styles.box2]}>
            <Image 
             source={require('../../../assets/images/img4.png')} 
              style={styles.image}
            />
          </View>
          <View style={[styles.imageBox, styles.box5]}>
            <Image 
              source={require('../../../assets/images/img5.png')} 
              style={styles.image}
            />
          </View>
        </View>

        {/* Column 3 */}
        <View style={styles.column3}>
          <View style={[styles.imageBox, styles.box3]}>
            <Image 
           source={require('../../../assets/images/img1.png')} 
              style={styles.image}
            />
          </View>
          <View style={[styles.imageBox, styles.box6]}>
            <Image 
            source={require('../../../assets/images/img7.png')} 
              style={styles.image}
            />
          </View>
          <View style={[styles.imageBox, styles.box8]}>
            <Image 
              source={require('../../../assets/images/img8.png')} 
              style={styles.image}
            />
          </View>
        </View>

        {/* Column 4 */}
        <View style={styles.column4}>
          <View style={[styles.imageBox, styles.box7]}>
            <Image 
              source={require('../../../assets/images/img9.png')} 
              style={styles.image}
            />
          </View>
          <View style={[styles.imageBox, styles.box9]}>
            <Image 
              source={require('../../../assets/images/img10.png')} 
              style={styles.image}
            />
          </View>
        </View>

        {/* Column 5 */}
        <View style={styles.column5}>
          <View style={[styles.imageBox, styles.box10]}>
            <Image 
            source={require('../../../assets/images/img11.png')} 
              style={styles.image}
            />
          </View>
          <View style={[styles.imageBox, styles.box11]}>
            <Image 
              source={require('../../../assets/images/img7.png')} 
              style={styles.image}
            />
          </View>
        </View>
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomContent}>
        <Text style={styles.brandName}>yipShop</Text>
        
        <TouchableOpacity style={styles.getStartButton}
        onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By proceeding to use yipShop, you agree to our terms and{'\n'}
          condition and privacy policy.
        </Text>
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    marginTop:15,
    paddingTop: 100,
    gap: 10,
    height: '60%',
  },


  column: {
    flex: 1,
    gap: 10,
     marginTop:50
  },
   column3: {
    flex: 1,
    gap: 10,
    marginTop:-10
  },

   column2: {
    flex: 1,
    gap: 10,
    marginTop:80

  },

  column4: {
    flex: 1,
    gap: 10,
    marginTop:35

  },
  column5: {
    flex: 1,
    gap: 10,
    marginTop:70

  },
  imageBox: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
 

  box1: { height: 120 },
  box2: { height: 110, },
  box3: { height: 100 },
  box4: { height: 140 },
  box5: { height: 150 },
  box6: { height: 90 },
  box7: { height: 100 },
  box8: { height: 120 },
  box9: { height: 130 },
  box10: { height: 90 },
  box11: { height: 140 },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 30,
  },
  brandName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#C14242',
    marginBottom: 40,
    fontFamily: 'serif',
  },
  getStartButton: {
    width: '100%',
    backgroundColor: colors.main,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight:'bold'
  },
})