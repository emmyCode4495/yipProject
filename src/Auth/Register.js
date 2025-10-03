import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
    const navigation = useNavigation()
    const { register } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    })
    const [secureTextPassword, setSecureTextPassword] = useState(true)
    const [secureTextConfirm, setSecureTextConfirm] = useState(true)
    const [loading, setLoading] = useState(false)

    // Update form data
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // Validate form
    const validateForm = () => {
        const { email, phoneNumber, password, confirmPassword } = formData

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address')
            return false
        }

        // Phone number validation
        const phoneRegex = /^\+?[\d\s-()]{10,}$/
        if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
            Alert.alert('Error', 'Please enter a valid phone number')
            return false
        }

        // Password validation
        if (!password || password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long')
            return false
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match')
            return false
        }

        return true
    }

    // Handle registration
    const handleRegister = async () => {
        if (!validateForm()) return

        setLoading(true)

        try {
            const result = await register(formData)

            if (result.success) {
                Alert.alert(
                    'Success',
                    'Account created successfully!',
                    [{ text: 'OK' }]
                )
                
                // Reset form
                setFormData({
                    email: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: ''
                })
                
            } else {
                Alert.alert('Error', result.message || 'Registration failed')
            }

        } catch (error) {
            console.error('Registration error:', error)
            Alert.alert('Error', 'An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.brandName}>yipShop</Text>
                <Text style={styles.subtitle}>Create an account to get started</Text>
            </View>

            {/* Register Form */}
            <ScrollView 
                style={styles.formContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContent}>
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

                    {/* Phone Number Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#999"
                                value={formData.phoneNumber}
                                onChangeText={(value) => handleInputChange('phoneNumber', value)}
                                keyboardType="phone-pad"
                                autoComplete="tel"
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
                                secureTextEntry={secureTextPassword}
                                autoCapitalize="none"
                                autoComplete="password"
                                editable={!loading}
                            />
                            <TouchableOpacity 
                                style={styles.eyeButton}
                                onPress={() => setSecureTextPassword(!secureTextPassword)}
                                disabled={loading}
                            >
                                <Ionicons 
                                    name={secureTextPassword ? "eye-off-outline" : "eye-outline"} 
                                    size={22} 
                                    color="#999" 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.passwordContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Re-enter your password"
                                placeholderTextColor="#999"
                                value={formData.confirmPassword}
                                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                                secureTextEntry={secureTextConfirm}
                                autoCapitalize="none"
                                autoComplete="password"
                                editable={!loading}
                            />
                            <TouchableOpacity 
                                style={styles.eyeButton}
                                onPress={() => setSecureTextConfirm(!secureTextConfirm)}
                                disabled={loading}
                            >
                                <Ionicons 
                                    name={secureTextConfirm ? "eye-off-outline" : "eye-outline"} 
                                    size={22} 
                                    color="#999" 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Register Button */}
                    <TouchableOpacity 
                        style={[
                            styles.registerButton,
                            loading && styles.registerButtonDisabled
                        ]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" size="small" />
                        ) : (
                            <Text style={styles.registerButtonText}>Create Account</Text>
                        )}
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.dividerText}>or sign up with</Text>
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

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <Pressable
                            onPress={() => navigation.navigate('login')}
                            disabled={loading}
                        >
                            <Text style={styles.loginLink}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Register

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
    },
    formContent: {
        paddingHorizontal: 30,
        paddingTop: 40,
        paddingBottom: 40,
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
    registerButton: {
        backgroundColor: '#C14242',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25,
    },
    registerButtonDisabled: {
        backgroundColor: '#E0A0A0',
    },
    registerButtonText: {
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginLink: {
        color: '#C14242',
        fontSize: 14,
        fontWeight: '600',
    },
})