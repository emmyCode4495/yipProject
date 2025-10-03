// import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, Modal, Alert } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { Ionicons } from '@expo/vector-icons'
// import * as ImagePicker from 'expo-image-picker'
// import axios from 'axios'
// import endpoint from '@/constants/endpoint'
// import { useNavigation } from '@react-navigation/native'

// const ListedItems = () => {

//     const navigation = useNavigation();
//   const [items, setItems] = useState([])
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [showLimitModal, setShowLimitModal] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [newItem, setNewItem] = useState({
//     name: '',
//     price: '',
//     image: null
//   })

//   const MAX_ITEMS = 5

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   const fetchProducts = async () => {
//     try {
//       setLoading(true)
//       const res = await axios.get(`${endpoint.main}/products/get-all`)
//       setItems(res.data.data) 
//     } catch (err) {
//       console.error("Fetch products error:", err.message)
//       Alert.alert("Error", "Could not load products.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleAddItem = () => {
//     if (items.length >= MAX_ITEMS) {
//       setShowLimitModal(true)
//       return
//     }
//     setShowAddModal(true)
//   }

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     })

//     if (!result.canceled) {
//       setNewItem({ ...newItem, image: result.assets[0].uri })
//     }
//   }


// const saveItem = async () => {
//   if (!newItem.name || !newItem.price || !newItem.image) {
//     Alert.alert('Error', 'Please fill in all required fields')
//     return
//   }

//   try {
//     const formData = new FormData()
    
//     // Append text fields
//     formData.append("name", newItem.name)
//     formData.append("price", newItem.price.toString())
    
//     // Append image file - use "image" as field name to match multer config
//     const imageUri = newItem.image
//     const filename = imageUri.split('/').pop()
//     const match = /\.(\w+)$/.exec(filename)
//     const type = match ? `image/${match[1]}` : 'image/jpeg'

//     formData.append("image", {  // Changed from "imageUrl" to "image"
//       uri: imageUri,
//       type: type,
//       name: filename || `product_${Date.now()}.jpg`
//     })

//     console.log('Sending form data with image...')

//     const res = await axios.post(`${endpoint.main}/products/add`, formData, {
//       headers: { 
//         "Content-Type": "multipart/form-data",
//       },
//       timeout: 30000
//     })

//     console.log('Response:', res.data)

//     if (res.data.success) {
//       Alert.alert("Success", "Item added successfully!")
//       setShowAddModal(false)
//       resetForm()
//       fetchProducts()
//     }
//   } catch (err) {
//     console.error("Add product error:", err)
//     console.error("Error details:", err.response?.data)
//     Alert.alert("Error", err.response?.data?.message || "Could not add product.")
//   }
// }

//  const deleteItem = (id) => {
//   Alert.alert(
//     'Delete Item',
//     'Are you sure you want to delete this item?',
//     [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           try {
        
//             await axios.delete(`${endpoint.main}/${id}`);

//             setItems((prevItems) => prevItems.filter(item => item._id !== id));

//             Alert.alert('Success', 'Item deleted successfully');
//           } catch (error) {
//             console.error("Delete error:", error.response?.data || error.message);
//             Alert.alert('Error', 'Failed to delete item. Please try again.');
//           }
//         }
//       }
//     ]
//   );
// };

//   const resetForm = () => {
//     setNewItem({
//       name: '',
//       price: '',
//       description: '',
//       category: '',
//       image: null
//     })
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Listed Items</Text>
//         <View style={styles.itemCount}>
//           <Text style={styles.itemCountText}>{items.length}/{MAX_ITEMS}</Text>
//         </View>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {loading ? (
//           <Text style={{ textAlign: "center", marginTop: 40 }}>Loading...</Text>
//         ) : items.length === 0 ? (
//           <View style={styles.emptyState}>
//             <Ionicons name="cube-outline" size={80} color="#E0E0E0" />
//             <Text style={styles.emptyTitle}>No Items Yet</Text>
//             <Text style={styles.emptySubtitle}>Start adding items to display on your home page</Text>
//           </View>
//         ) : (
//           <View style={styles.itemsGrid}>
//             {items.map((item) => (
//               <TouchableOpacity key={item._id} style={styles.itemCard}
//               onPress={() => navigation.navigate('ItemDetails', { item })}>
//                 <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
//                 <TouchableOpacity 
//                   style={styles.deleteButton}
//                   onPress={() => deleteItem(item._id)}
//                 >
//                   <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
//                 </TouchableOpacity>
//                 <View style={styles.itemInfo}>
//                   <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
//                   <Text style={styles.itemPrice}>${item.price}</Text>
//                   {item.category && (
//                     <View style={styles.categoryBadge}>
//                       <Text style={styles.categoryText}>{item.category}</Text>
//                     </View>
//                   )}
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </ScrollView>

//       {/* Add Button */}
//       <TouchableOpacity 
//         style={[
//           styles.addButton,
//           items.length >= MAX_ITEMS && styles.addButtonDisabled
//         ]}
//         onPress={handleAddItem}
//       >
//         <Ionicons name="add" size={28} color="#FFFFFF" />
//       </TouchableOpacity>

//       {/* Add Item Modal */}
//       <Modal
//         visible={showAddModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowAddModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add New Item</Text>
//               <TouchableOpacity onPress={() => setShowAddModal(false)}>
//                 <Ionicons name="close" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>

//             <ScrollView showsVerticalScrollIndicator={false}>
//               {/* Image Picker */}
//               <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//                 {newItem.image ? (
//                   <Image source={{ uri: newItem.image }} style={styles.previewImage} />
//                 ) : (
//                   <View style={styles.imagePickerPlaceholder}>
//                     <Ionicons name="camera-outline" size={40} color="#999" />
//                     <Text style={styles.imagePickerText}>Add Photo</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>

//               {/* Item Name */}
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Item Name *</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter item name"
//                   value={newItem.name}
//                   onChangeText={(text) => setNewItem({ ...newItem, name: text })}
//                 />
//               </View>

//               {/* Price */}
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Price *</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="0.00"
//                   keyboardType="decimal-pad"
//                   value={newItem.price}
//                   onChangeText={(text) => setNewItem({ ...newItem, price: text })}
//                 />
//               </View>

//               {/* Save Button */}
//               <TouchableOpacity style={styles.saveButton} onPress={saveItem}>
//                 <Text style={styles.saveButtonText}>Save Item</Text>
//               </TouchableOpacity>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>

//       {/* Limit Reached Modal */}
//       <Modal
//         visible={showLimitModal}
//         animationType="fade"
//         transparent={true}
//         onRequestClose={() => setShowLimitModal(false)}
//       >
//         <View style={styles.limitModalOverlay}>
//           <View style={styles.limitModalContent}>
//             <View style={styles.limitIconContainer}>
//               <Ionicons name="alert-circle" size={60} color="#C14242" />
//             </View>
//             <Text style={styles.limitTitle}>Limit Reached!</Text>
//             <Text style={styles.limitMessage}>
//               You've reached the maximum limit of {MAX_ITEMS} items. 
//               Please delete an existing item to add a new one.
//             </Text>
//             <TouchableOpacity 
//               style={styles.limitButton}
//               onPress={() => setShowLimitModal(false)}
//             >
//               <Text style={styles.limitButtonText}>Got it!</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// export default ListedItems

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   itemCount: {
//     backgroundColor: '#FFF0F0',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   itemCountText: {
//     color: '#C14242',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 100,
//   },
//   emptyTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 20,
//   },
//   emptySubtitle: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   itemsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 15,
//   },
//   itemCard: {
//     width: '47%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   itemImage: {
//     width: '100%',
//     height: 140,
//     backgroundColor: '#F5F5F5',
//   },
//   deleteButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#C14242',
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   itemInfo: {
//     padding: 12,
//   },
//   itemName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },
//   itemPrice: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#C14242',
//     marginBottom: 8,
//   },
//   categoryBadge: {
//     backgroundColor: '#F5F5F5',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//     alignSelf: 'flex-start',
//   },
//   categoryText: {
//     fontSize: 11,
//     color: '#666',
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 30,
//     right: 20,
//     backgroundColor: '#C14242',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#C14242',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   addButtonDisabled: {
//     backgroundColor: '#E0A0A0',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 40,
//     maxHeight: '90%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   imagePicker: {
//     width: '100%',
//     height: 200,
//     borderRadius: 12,
//     backgroundColor: '#F5F5F5',
//     marginBottom: 20,
//     overflow: 'hidden',
//   },
//   imagePickerPlaceholder: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderStyle: 'dashed',
//     borderColor: '#E0E0E0',
//     margin: 10,
//     borderRadius: 12,
//   },
//   imagePickerText: {
//     color: '#999',
//     fontSize: 14,
//     marginTop: 8,
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontSize: 16,
//     color: '#333',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   saveButton: {
//     backgroundColor: '#C14242',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   limitModalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   limitModalContent: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 24,
//     padding: 30,
//     alignItems: 'center',
//     width: '100%',
//     maxWidth: 340,
//   },
//   limitIconContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#FFF0F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   limitTitle: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 12,
//   },
//   limitMessage: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 24,
//     marginBottom: 24,
//   },
//   limitButton: {
//     backgroundColor: '#C14242',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 12,
//     minWidth: 150,
//   },
//   limitButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
// })

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, Modal, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import endpoint from '@/constants/endpoint'
import { useNavigation } from '@react-navigation/native'

const ListedItems = () => {
  const navigation = useNavigation()
  const [items, setItems] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    image: null
  })

  const MAX_ITEMS = 5

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${endpoint.main}/products/get-all`)
      setItems(res.data.data) 
    } catch (err) {
      console.error("Fetch products error:", err.message)
      Alert.alert("Error", "Could not load products.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = () => {
    if (items.length >= MAX_ITEMS) {
      setShowLimitModal(true)
      return
    }
    setShowAddModal(true)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setNewItem({ ...newItem, image: result.assets[0].uri })
    }
  }

  const saveItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.image) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    try {
      const formData = new FormData()
      
      formData.append("name", newItem.name)
      formData.append("price", newItem.price.toString())
      
      const imageUri = newItem.image
      const filename = imageUri.split('/').pop()
      const match = /\.(\w+)$/.exec(filename)
      const type = match ? `image/${match[1]}` : 'image/jpeg'

      formData.append("image", {
        uri: imageUri,
        type: type,
        name: filename || `product_${Date.now()}.jpg`
      })

      const res = await axios.post(`${endpoint.main}/products/add`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000
      })

      if (res.data.success) {
        Alert.alert("Success", "Item added successfully!")
        setShowAddModal(false)
        resetForm()
        fetchProducts()
      }
    } catch (err) {
      console.error("Add product error:", err)
      Alert.alert("Error", err.response?.data?.message || "Could not add product.")
    }
  }

  const initiateDelete = (item) => {
    setItemToDelete(item)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    try {
      setDeleting(true)
      await axios.delete(`${endpoint.main}/products/${itemToDelete._id}`)
      
      setItems((prevItems) => prevItems.filter(item => item._id !== itemToDelete._id))
      setShowDeleteModal(false)
      setItemToDelete(null)
      
      // Show success after modal closes
      setTimeout(() => {
        Alert.alert('Success', 'Item deleted successfully')
      }, 300)
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message)
      setShowDeleteModal(false)
      setTimeout(() => {
        Alert.alert('Error', 'Failed to delete item. Please try again.')
      }, 300)
    } finally {
      setDeleting(false)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  const resetForm = () => {
    setNewItem({
      name: '',
      price: '',
      image: null
    })
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Listed Items</Text>
        <View style={styles.itemCount}>
          <Text style={styles.itemCountText}>{items.length}/{MAX_ITEMS}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#C14242" />
            <Text style={styles.loadingText}>Loading items...</Text>
          </View>
        ) : items.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={80} color="#E0E0E0" />
            <Text style={styles.emptyTitle}>No Items Yet</Text>
            <Text style={styles.emptySubtitle}>Start adding items to display on your home page</Text>
          </View>
        ) : (
          <View style={styles.itemsGrid}>
            {items.map((item) => (
              <TouchableOpacity 
                key={item._id} 
                style={styles.itemCard}
                onPress={() => navigation.navigate('ItemDetails', { item })}
                activeOpacity={0.7}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
             
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                  {item.category && (
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity 
        style={[
          styles.addButton,
          items.length >= MAX_ITEMS && styles.addButtonDisabled
        ]}
        onPress={handleAddItem}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Item Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Item</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {newItem.image ? (
                  <Image source={{ uri: newItem.image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.imagePickerPlaceholder}>
                    <Ionicons name="camera-outline" size={40} color="#999" />
                    <Text style={styles.imagePickerText}>Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Item Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter item name"
                  value={newItem.name}
                  onChangeText={(text) => setNewItem({ ...newItem, name: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Price *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  value={newItem.price}
                  onChangeText={(text) => setNewItem({ ...newItem, price: text })}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={saveItem}>
                <Text style={styles.saveButtonText}>Save Item</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>


      {/* Limit Reached Modal */}
      <Modal
        visible={showLimitModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowLimitModal(false)}
      >
        <View style={styles.limitModalOverlay}>
          <View style={styles.limitModalContent}>
            <View style={styles.limitIconContainer}>
              <Ionicons name="alert-circle" size={60} color="#C14242" />
            </View>
            <Text style={styles.limitTitle}>Limit Reached!</Text>
            <Text style={styles.limitMessage}>
              You've reached the maximum limit of {MAX_ITEMS} items. 
              Please delete an existing item to add a new one.
            </Text>
            <TouchableOpacity 
              style={styles.limitButton}
              onPress={() => setShowLimitModal(false)}
            >
              <Text style={styles.limitButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ListedItems

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  itemCountText: {
    color: '#C14242',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  itemCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F5F5F5',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#C14242',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C14242',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 11,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#C14242',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C14242',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonDisabled: {
    backgroundColor: '#E0A0A0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  imagePicker: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
    overflow: 'hidden',
  },
  imagePickerPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E0E0E0',
    margin: 10,
    borderRadius: 12,
  },
  imagePickerText: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#C14242',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  deleteModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  deleteModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  deleteIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  deleteMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  deleteActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmDeleteButton: {
    flex: 1,
    backgroundColor: '#C14242',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmDeleteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  limitModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  limitModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  limitIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  limitTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  limitMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  limitButton: {
    backgroundColor: '#C14242',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 150,
  },
  limitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})