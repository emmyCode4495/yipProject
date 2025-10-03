import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons'
import { useAuth } from '../../contexts/AuthContext'

const ProfilePage = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout()
          }
        }
      ]
    )
  }

  const profileOptions = [
    {
      id: 1,
      icon: 'shopping-bag',
      iconType: 'Feather',
      title: 'My Orders',
      subtitle: 'View your order history',
      onPress: () => Alert.alert('My Orders', 'Order history feature coming soon')
    },
    {
      id: 2,
      icon: 'location-outline',
      iconType: 'Ionicons',
      title: 'Shipping Address',
      subtitle: 'Manage your addresses',
      onPress: () => Alert.alert('Shipping Address', 'Address management coming soon')
    },
    {
      id: 3,
      icon: 'payment',
      iconType: 'MaterialIcons',
      title: 'Payment Methods',
      subtitle: 'Manage payment options',
      onPress: () => Alert.alert('Payment Methods', 'Payment management coming soon')
    },
    {
      id: 4,
      icon: 'settings-outline',
      iconType: 'Ionicons',
      title: 'Settings',
      subtitle: 'App preferences',
      onPress: () => Alert.alert('Settings', 'Settings page coming soon')
    },
    {
      id: 5,
      icon: 'help-circle-outline',
      iconType: 'Ionicons',
      title: 'Help & Support',
      subtitle: 'Get help or contact us',
      onPress: () => Alert.alert('Help & Support', 'Support page coming soon')
    }
  ]

  const renderIcon = (iconName, iconType) => {
    switch(iconType) {
      case 'Feather':
        return <Feather name={iconName} size={22} color="#666" />
      case 'MaterialIcons':
        return <MaterialIcons name={iconName} size={22} color="#666" />
      default:
        return <Ionicons name={iconName} size={22} color="#666" />
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('../../../assets/images/img11.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user?.name || 'John Doe'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'john.doe@example.com'}</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Feather name="edit-2" size={16} color="#C14242" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="bag-handle-outline" size={24} color="#C14242" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        
        <View style={styles.statCard}>
          <Ionicons name="heart-outline" size={24} color="#C14242" />
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>
        
        <View style={styles.statCard}>
          <Ionicons name="star-outline" size={24} color="#C14242" />
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* Options List */}
      <View style={styles.optionsContainer}>
        {profileOptions.map((option) => (
          <TouchableOpacity 
            key={option.id}
            style={styles.optionItem}
            onPress={option.onPress}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionIconContainer}>
                {renderIcon(option.icon, option.iconType)}
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Version Info */}
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#C14242',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#C14242',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  editProfileText: {
    color: '#C14242',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#C14242',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#C14242',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: 30,
  },
})