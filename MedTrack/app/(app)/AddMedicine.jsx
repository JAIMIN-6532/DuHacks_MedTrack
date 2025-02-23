// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';
// import axios from 'axios';

// export default function AddMedicine() {
//   const [medicineName, setMedicineName] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [expiryDate, setExpiryDate] = useState(new Date());
//   const [doseAmount, setDoseAmount] = useState('');
//   const [doseTimes, setDoseTimes] = useState(['']);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleAddDoseTime = () => {
//     setDoseTimes([...doseTimes, '']);
//   };

//   const handleDoseTimeChange = (text, index) => {
//     const newDoseTimes = [...doseTimes];
//     newDoseTimes[index] = text;
//     setDoseTimes(newDoseTimes);
//   };

//   const handleSubmit = async () => {
//     if (!medicineName || !quantity || !doseAmount || doseTimes.some(time => !time)) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const userId = await AsyncStorage.getItem('userId');
//       const response = await axios.post('YOUR_API_ENDPOINT/medicines', {
//         userId,
//         medicineName,
//         quantity,
//         expiryDate,
//         doseAmount,
//         doseTimes,
//       });

//       Alert.alert('Success', 'Medicine added successfully');
//       router.replace('/(app)/Home');
//     } catch (error) {
//       Alert.alert('Error', error.response?.data?.message || 'Failed to add medicine');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <LinearGradient
//         colors={['#4c669f', '#3b5998', '#192f6a']}
//         style={styles.header}
//       >
//         <Text style={styles.headerText}>Add New Medicine</Text>
//       </LinearGradient>

//       <View style={styles.formContainer}>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Medicine Name</Text>
//           <TextInput
//             style={styles.input}
//             value={medicineName}
//             onChangeText={setMedicineName}
//             placeholder="Enter medicine name"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={quantity}
//             onChangeText={setQuantity}
//             placeholder="Enter quantity"
//             keyboardType="numeric"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Expiry Date</Text>
//           <TouchableOpacity
//             style={styles.dateButton}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <Text style={styles.dateButtonText}>
//               {expiryDate.toLocaleDateString()}
//             </Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={expiryDate}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) {
//                   setExpiryDate(selectedDate);
//                 }
//               }}
//               minimumDate={new Date()}
//             />
//           )}
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Dose Amount</Text>
//           <TextInput
//             style={styles.input}
//             value={doseAmount}
//             onChangeText={setDoseAmount}
//             placeholder="Enter dose amount"
//             keyboardType="numeric"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Dose Times</Text>
//           {doseTimes.map((time, index) => (
//             <TextInput
//               key={index}
//               style={styles.input}
//               value={time}
//               onChangeText={(text) => handleDoseTimeChange(text, index)}
//               placeholder="Enter time (e.g., 09:00)"
//               placeholderTextColor="#a0a0a0"
//             />
//           ))}
//           <TouchableOpacity
//             style={styles.addTimeButton}
//             onPress={handleAddDoseTime}
//           >
//             <Text style={styles.addTimeButtonText}>+ Add Another Time</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           <Text style={styles.submitButtonText}>
//             {loading ? 'Adding Medicine...' : 'Add Medicine'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     padding: 30,
//     paddingTop: 60,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
//   formContainer: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#192f6a',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 10,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   dateButton: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   dateButtonText: {
//     fontSize: 16,
//     color: '#000000',
//   },
//   addTimeButton: {
//     marginTop: 10,
//     padding: 10,
//     alignItems: 'center',
//   },
//   addTimeButtonText: {
//     color: '#192f6a',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   submitButton: {
//     backgroundColor: '#192f6a',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });


/////old/////////

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { router } from 'expo-router';

// export default function AddMedicine() {
//   const [medicineName, setMedicineName] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [expiryDate, setExpiryDate] = useState(new Date());
//   const [doseAmount, setDoseAmount] = useState('');
//   const [doseTimes, setDoseTimes] = useState(['']);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleAddDoseTime = () => {
//     setDoseTimes([...doseTimes, '']);
//   };

//   const handleDoseTimeChange = (text, index) => {
//     const newDoseTimes = [...doseTimes];
//     newDoseTimes[index] = text;
//     setDoseTimes(newDoseTimes);
//   };

//   const handleSubmit = async () => {
//     if (!medicineName || !quantity || !doseAmount || doseTimes.some(time => !time)) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Simulate successful addition
//       Alert.alert('Success', 'Medicine added successfully');
//       router.replace('/(app)/Home');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to add medicine');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <LinearGradient
//         colors={['#4c669f', '#3b5998', '#192f6a']}
//         style={styles.header}
//       >
//         <Text style={styles.headerText}>Add New Medicine</Text>
//       </LinearGradient>

//       <View style={styles.formContainer}>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Medicine Name</Text>
//           <TextInput
//             style={styles.input}
//             value={medicineName}
//             onChangeText={setMedicineName}
//             placeholder="Enter medicine name"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={quantity}
//             onChangeText={setQuantity}
//             placeholder="Enter quantity"
//             keyboardType="numeric"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Expiry Date</Text>
//           <TouchableOpacity
//             style={styles.dateButton}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <Text style={styles.dateButtonText}>
//               {expiryDate.toLocaleDateString()}
//             </Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={expiryDate}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) {
//                   setExpiryDate(selectedDate);
//                 }
//               }}
//               minimumDate={new Date()}
//             />
//           )}
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Dose Amount</Text>
//           <TextInput
//             style={styles.input}
//             value={doseAmount}
//             onChangeText={setDoseAmount}
//             placeholder="Enter dose amount"
//             keyboardType="numeric"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Dose Times</Text>
//           {doseTimes.map((time, index) => (
//             <TextInput
//               key={index}
//               style={styles.input}
//               value={time}
//               onChangeText={(text) => handleDoseTimeChange(text, index)}
//               placeholder="Enter time (e.g., 09:00)"
//               placeholderTextColor="#a0a0a0"
//             />
//           ))}
//           <TouchableOpacity
//             style={styles.addTimeButton}
//             onPress={handleAddDoseTime}
//           >
//             <Text style={styles.addTimeButtonText}>+ Add Another Time</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           <Text style={styles.submitButtonText}>
//             {loading ? 'Adding Medicine...' : 'Add Medicine'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     padding: 30,
//     paddingTop: 60,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
//   formContainer: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#192f6a',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 10,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   dateButton: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   dateButtonText: {
//     fontSize: 16,
//     color: '#000000',
//   },
//   addTimeButton: {
//     marginTop: 10,
//     padding: 10,
//     alignItems: 'center',
//   },
//   addTimeButtonText: {
//     color: '#192f6a',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   submitButton: {
//     backgroundColor: '#192f6a',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';  // Import axios

export default function AddMedicine() {
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [doseAmount, setDoseAmount] = useState('');
  const [doseTimes, setDoseTimes] = useState(['']);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddDoseTime = () => {
    setDoseTimes([...doseTimes, '']);
  };

  const handleDoseTimeChange = (text, index) => {
    const newDoseTimes = [...doseTimes];
    newDoseTimes[index] = text;
    setDoseTimes(newDoseTimes);
  };

  const handleSubmit = async () => {
    if (!medicineName || !quantity || !doseAmount || doseTimes.some(time => !time)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {

      const userData = await AsyncStorage.getItem('userData');
      const userId = await JSON.parse(userData).id;

      const newMedicine = {
        name: medicineName.trim(),
        quantity: parseFloat(quantity) || 0,
        expiryDate: expiryDate.toISOString().split('T')[0],
        amount: parseFloat(doseAmount) || 0,
        times: doseTimes.map(time => time.trim()), 
        userId: userId,
      };
      
      // Make the POST request using axios
      console.log("before",newMedicine);
      const response = await axios.post(
        'http://10.0.2.2:8888/api/v1/healthproduct/insert',
        newMedicine,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("after",response.data);
      if (response.status === 200) {
        Alert.alert('Success', 'Medicine added successfully');
        router.replace('/(app)/Home');
      } else {
        console.log("dbjgdjhbgfdhbgfhj", response.data);
        throw new Error('Failed to add medicine');
      }
    } catch (error) {
      console.log("error", error);
      Alert.alert('Error', 'Failed to add medicine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Add New Medicine</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medicine Name</Text>
          <TextInput
            style={styles.input}
            value={medicineName}
            onChangeText={setMedicineName}
            placeholder="Enter medicine name"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter quantity"
            keyboardType="numeric"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Expiry Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {expiryDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={expiryDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setExpiryDate(selectedDate);
                }
              }}
              minimumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dose Amount</Text>
          <TextInput
            style={styles.input}
            value={doseAmount}
            onChangeText={setDoseAmount}
            placeholder="Enter dose amount"
            keyboardType="numeric"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dose Times</Text>
          {doseTimes.map((time, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={time}
              onChangeText={(text) => handleDoseTimeChange(text, index)}
              placeholder="Enter time (e.g., 09:00)"
              placeholderTextColor="#a0a0a0"
            />
          ))}
          <TouchableOpacity
            style={styles.addTimeButton}
            onPress={handleAddDoseTime}
          >
            <Text style={styles.addTimeButtonText}>+ Add Another Time</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Adding Medicine...' : 'Add Medicine'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#192f6a',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  addTimeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  addTimeButtonText: {
    color: '#192f6a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#192f6a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
