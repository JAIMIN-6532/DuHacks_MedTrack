
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Home() {
//   const [activeTab, setActiveTab] = useState('daily');
//   const [userId, setUserId] = useState(null);

//   // States for real data fetched from APIs
//   const [dailyDoses, setDailyDoses] = useState([]);
//   const [stockDetails, setStockDetails] = useState([]);
//   const [weeklyConsumption, setWeeklyConsumption] = useState([]);
//   const [lowStock, setLowStock] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch data from API on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       const userData = await AsyncStorage.getItem('userData');
//       const uid = JSON.parse(userData).id;
//       setUserId(uid);
//       setLoading(true);
//       console.log('uid', uid);
//       try {
//         // Replace with your actual API URLs
//         const dailyResponse = await axios.get(`http://10.0.2.2:8888/api/v1/logs/daily-dose/${userId}`);
//         const stockResponse = await axios.get(`http://10.0.2.2:8888/api/v1/healthproduct/user/${userId}`);
//         const weeklyResponse = await axios.get(`http://10.0.2.2:8888/api/v1/logs/${userId}/time/7`);
//         const lowStockResponse = await axios.get(`http://10.0.2.2:8888/api/v1/healthproduct/user/lower/${userId}`);
        
//         console.log('dailyResponse', dailyResponse.data);
//         console.log('stockResponse', stockResponse.data);
//         console.log('weeklyResponse', weeklyResponse.data);
//         console.log('lowStockResponse', lowStockResponse.data);

//         // Set the fetched data into state
//         setDailyDoses(dailyResponse.data);
//         setStockDetails(stockResponse.data);
//         setWeeklyConsumption(weeklyResponse.data);
//         setLowStock(lowStockResponse.data);
//       } catch (error) {
//         console.log('Error fetching data:', error);
//         Alert.alert('Error', 'Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]); // Empty array ensures this runs only once when the component mounts

//   const renderDailyDoses = () => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionTitle}>Today's Medications</Text>
//       {dailyDoses.map((med, index) => (
//         <View key={index} style={styles.medicineCard}>
//           <Text style={styles.medicineName}>{med.healthProductName}</Text>
//           <View style={styles.medicineDetails}>
//             <Text>Taken: {med.isTakenCount}</Text>
//             <Text>Left: {med.misCount}</Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );

//   const renderStockDetails = () => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionTitle}>Stock Details</Text>
//       {stockDetails.map((med, index) => (
//         <View key={index} style={styles.medicineCard}>
//           <Text style={styles.medicineName}>{med.name}</Text>
//           <View style={styles.medicineDetails}>
//             <Text>Current Stock: {med.quantity}</Text>
//             <Text>Expires: {med.expiryDate}</Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );

//   const renderWeeklyConsumption = () => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionTitle}>Weekly Consumption</Text>
//       {weeklyConsumption.map((med, index) => (
//         <View key={index} style={styles.medicineCard}>
//           <Text style={styles.medicineName}>{med.healthProductName}</Text>
//           <View style={styles.medicineDetails}>
//             <Text>Consumed: {med.isTakenCount}</Text>
//             <Text>Remaining: {med.MisCount}</Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );

//   const renderLowStock = () => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionTitle}>Low Stock Medications</Text>
//       {lowStock.map((med, index) => (
//         <View key={index} style={styles.medicineCard}>
//           <Text style={styles.medicineName}>{med.name}</Text>
//           <View style={styles.medicineDetails}>
//             <Text>Stock Left: {med.quantity}</Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'daily':
//         return renderDailyDoses();
//       case 'stock':
//         return renderStockDetails();
//       case 'weekly':
//         return renderWeeklyConsumption();
//       case 'low':
//         return renderLowStock();
//       default:
//         return null;
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <LinearGradient
//         colors={['#6a11cb', '#2575fc']}
//         style={styles.header}
//       >
//         <Text style={styles.headerTitle}>Medicine Dashboard</Text>
//       </LinearGradient>

//       <View style={styles.tabContainer}>
//         <TouchableOpacity onPress={() => setActiveTab('daily')} style={styles.tabButton}>
//           <Text style={activeTab === 'daily' ? styles.activeTab : styles.inactiveTab}>Daily Doses</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab('stock')} style={styles.tabButton}>
//           <Text style={activeTab === 'stock' ? styles.activeTab : styles.inactiveTab}>Stock Details</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab('weekly')} style={styles.tabButton}>
//           <Text style={activeTab === 'weekly' ? styles.activeTab : styles.inactiveTab}>Weekly Consumption</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab('low')} style={styles.tabButton}>
//           <Text style={activeTab === 'low' ? styles.activeTab : styles.inactiveTab}>Low Stock</Text>
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         renderContent()
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
//   tabButton: {
//     padding: 10,
//     borderRadius: 5,
//   },
//   activeTab: {
//     fontSize: 16,
//     color: '#2575fc',
//     fontWeight: 'bold',
//   },
//   inactiveTab: {
//     fontSize: 16,
//     color: '#888',
//   },
//   sectionContainer: {
//     marginVertical: 10,
//     paddingHorizontal: 15,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   medicineCard: {
//     padding: 10,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   medicineName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   medicineDetails: {
//     marginTop: 5,
//     fontSize: 14,
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function Home() {
  const [activeTab, setActiveTab] = useState('daily');
  const [userId, setUserId] = useState(null);
  const [dailyDoses, setDailyDoses] = useState([]);
  const [stockDetails, setStockDetails] = useState([]);
  const [weeklyConsumption, setWeeklyConsumption] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) return;
        
        const { id: uid } = JSON.parse(userData);
        setUserId(uid);

        const [dailyRes, stockRes, weeklyRes, lowRes] = await Promise.all([
          axios.get(`http://10.0.2.2:8888/api/v1/logs/daily-dose/${uid}`),
          axios.get(`http://10.0.2.2:8888/api/v1/healthproduct/user/${uid}`),
          axios.get(`http://10.0.2.2:8888/api/v1/logs/${uid}/time/7`),
          axios.get(`http://10.0.2.2:8888/api/v1/healthproduct/user/lower/${uid}`)
        ]);

        setDailyDoses(dailyRes.data);
        setStockDetails(stockRes.data);
        setWeeklyConsumption(weeklyRes.data);
        setLowStock(lowRes.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderCard = (title, items, renderContent, emptyMessage) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="sad-outline" size={40} color="#888" />
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      ) : (
        items.map(renderContent)
      )}
    </View>
  );

  const MedicineCard = ({ item, type }) => (
    <LinearGradient
      colors={['#ffffff', '#f8f9fa']}
      style={[styles.card, type === 'low' && styles.lowStockCard]}
    >
      <View style={styles.cardHeader}>
        <Ionicons 
          name="medical" 
          size={24} 
          color={type === 'low' ? '#ff6b6b' : '#4dabf7'} 
        />
        <Text style={styles.medicineName}>{item.name || item.healthProductName}</Text>
      </View>

      {type === 'stock' && (
        <View style={styles.cardRow}>
          <Ionicons name="pricetag" size={18} color="#495057" />
          <Text style={styles.cardText}>Stock: {item.quantity}</Text>
          <Ionicons name="calendar" size={18} color="#495057" style={styles.iconSpacing} />
          <Text style={[
            styles.cardText,
            moment(item.expiryDate).isBefore(moment()) && styles.expiredText
          ]}>
            Exp: {moment(item.expiryDate).format('DD MMM YYYY')}
          </Text>
        </View>
      )}

      {(type === 'daily' || type === 'weekly') && (
        <View style={styles.cardRow}>
          <View style={styles.statusPill}>
            <Ionicons name="checkmark-circle" size={16} color="#2f9e44" />
            <Text style={styles.pillText}>Taken: {item.isTakenCount}</Text>
          </View>
          <View style={[styles.statusPill, styles.missedPill]}>
            <Ionicons name="close-circle" size={16} color="#e03131" />
            <Text style={styles.pillText}>Missed: {item.misCount || item.MisCount}</Text>
          </View>
        </View>
      )}

      {type === 'low' && (
        <View style={styles.cardRow}>
          <Ionicons name="warning" size={20} color="#e03131" />
          <Text style={styles.lowStockText}>Only {item.quantity} left in stock</Text>
        </View>
      )}
    </LinearGradient>
  );

  const TabButton = ({ title, icon, tab }) => (
    <TouchableOpacity 
      onPress={() => setActiveTab(tab)}
      style={[styles.tabButton, activeTab === tab && styles.activeTab]}
    >
      <Ionicons 
        name={icon} 
        size={24} 
        color={activeTab === tab ? '#fff' : '#adb5bd'} 
      />
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4dabf7" />
        <Text style={styles.loadingText}>Loading Your Health Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#4dabf7', '#3bc9db']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Medication Management</Text>
        <Ionicons name="medkit" size={40} color="#fff" />
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TabButton title="Daily" icon="today" tab="daily" />
        <TabButton title="Stock" icon="cube" tab="stock" />
        <TabButton title="Weekly" icon="calendar" tab="weekly" />
        <TabButton title="Low" icon="alert" tab="low" />
      </View>

      {activeTab === 'daily' && renderCard(
        "Today's Medications",
        dailyDoses,
        (item, index) => <MedicineCard key={index} item={item} type="daily" />,
        "No medications scheduled for today"
      )}

      {activeTab === 'stock' && renderCard(
        "Medicine Stock",
        stockDetails,
        (item, index) => <MedicineCard key={index} item={item} type="stock" />,
        "No stock information available"
      )}

      {activeTab === 'weekly' && renderCard(
        "Weekly Summary",
        weeklyConsumption,
        (item, index) => <MedicineCard key={index} item={item} type="weekly" />,
        "No consumption data this week"
      )}

      {activeTab === 'low' && renderCard(
        "Low Stock Alerts",
        lowStock,
        (item, index) => <MedicineCard key={index} item={item} type="low" />,
        "All medications are well-stocked"
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'sans-serif-medium',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#e9ecef',
    width: '23%',
  },
  activeTab: {
    backgroundColor: '#4dabf7',
    shadowColor: '#4dabf7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  tabText: {
    marginTop: 5,
    fontSize: 12,
    color: '#adb5bd',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 15,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4dabf7',
  },
  card: {
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lowStockCard: {
    borderWidth: 2,
    borderColor: '#ffe3e3',
    backgroundColor: '#fff5f5',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginLeft: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#495057',
    marginLeft: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebfbee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  missedPill: {
    backgroundColor: '#ffe3e3',
  },
  pillText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#2b8a3e',
  },
  expiredText: {
    color: '#e03131',
    fontWeight: '600',
  },
  lowStockText: {
    color: '#e03131',
    marginLeft: 8,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#868e96',
    fontSize: 16,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#495057',
  },
  iconSpacing: {
    marginLeft: 15,
  },
});