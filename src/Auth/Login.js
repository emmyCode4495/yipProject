import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [secureText, setSecureText] = useState(true)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();
  const { login } = useAuth();

  // Update form data
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Validate form
  const validateForm = () => {
    const { email, password } = formData

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address')
      return false
    }

    // Password validation
    if (!password || password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long')
      return false
    }

    return true
  }

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return

    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        Alert.alert(
          'Success',
          'Login successful!',
          [{ text: 'OK' }]
        )
        
        // Reset form
        setFormData({
          email: '',
          password: ''
        })
        
      } else {
        Alert.alert('Error', result.message || 'Login failed')
      }

    } catch (error) {
      console.error('Login error:', error)
      Alert.alert('Error', 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Handle forgot password
  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset functionality will be implemented soon.',
      [{ text: 'OK' }]
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>yipShop</Text>
        <Text style={styles.subtitle}>Welcome back! Login to continue</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!loading}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry={secureText}
              autoCapitalize="none"
              autoComplete="password"
              editable={!loading}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setSecureText(!secureText)}
              disabled={loading}
            >
              <Ionicons 
                name={secureText ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="#999" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={handleForgotPassword}
          disabled={loading}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity 
          style={[
            styles.loginButton,
            loading && styles.loginButtonDisabled
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.line} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity 
            style={styles.socialButton}
            disabled={loading}
          >
            <AntDesign name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialButton}
            disabled={loading}
          >
            <FontAwesome name="facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialButton}
            disabled={loading}
          >
            <AntDesign name="apple1" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Pressable
            onPress={() => navigation.navigate('register')}
            disabled={loading}
          >
            <Text style={styles.signupLink}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 70,
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  brandName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#C14242',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputIcon: {
    marginLeft: 18,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    paddingHorizontal: 15,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: '#C14242',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#C14242',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonDisabled: {
    backgroundColor: '#E0A0A0',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#999',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#C14242',
    fontSize: 14,
    fontWeight: '600',
  },
})