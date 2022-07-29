import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function App() {
  const [fontLoad, setFontLoad] = useState(false);
  useEffect(() => {
    const Load = async () => {
      await Font.loadAsync({
        "Bazzi": require('./assets/fonts/Bazzi.ttf')
      })
      setFontLoad(true);
    }
    Load();
  }, []);

  if (fontLoad) {
    return (
      <LinearGradient style={{ ...styles.container }} colors={['#7F7FD5', '#86A8E7', '#91EAE4']}>
        <StatusBar style="dark" />
        <View style={styles.top_container}>
          <View style={styles.top_wapper}>
            <MaterialIcons name="location-on" size={24} color="black" style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.location}> 서울시 마포구</Text>
            </MaterialIcons>
          </View>
          <Text style={styles.main_date}>07/14</Text>
          <View style={styles.main_wrapper}>
            <MaterialCommunityIcons name="weather-cloudy" size={100} color="black">
              <View>
                <Text style={styles.main_temp}>27°C</Text>
                <Text style={styles.main_weather}>흐림</Text>
              </View>
            </MaterialCommunityIcons>
          </View>
        </View>
        <View style={styles.main_desc}>
          <View style={styles.main_hum}>
            <MaterialCommunityIcons name="water" size={25} color="black">
              <Text style={styles.main_humid}>습도 20%</Text>
            </MaterialCommunityIcons>
          </View>
          <View style={styles.main_sun}>
            <MaterialCommunityIcons name="weather-sunset-up" size={25} color="black">
              <Text style={styles.main_sunrise}>일출: </Text>
            </MaterialCommunityIcons>
            <MaterialCommunityIcons name="weather-sunset-down" size={25} color="black">
              <Text style={styles.main_sunset}>일몰: </Text>
            </MaterialCommunityIcons>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // ScrollIndicator delete.
          contentContainerStyle={styles.weekly_container}>
          <View style={styles.weekly_wrapper}>
            <Text style={styles.weekly_date}>14일(목)</Text>
            <MaterialCommunityIcons name="weather-cloudy" size={50} color="black" />
            <Text style={styles.weekly_temp}>27°C / 24°C</Text>

          </View>
          <View style={styles.weekly_wrapper}>
            <Text style={styles.weekly_date}>14일(목)</Text>
            <MaterialCommunityIcons name="weather-cloudy" size={50} color="black" />
            <Text style={styles.weekly_temp}>27 / 24</Text>

          </View>

          <View style={styles.weekly_wrapper}>
            <Text style={styles.weekly_date}>14일(목)</Text>
            <MaterialCommunityIcons name="weather-cloudy" size={50} color="black" />
            <Text style={styles.weekly_temp}>27 / 24</Text>

          </View>

          <View style={styles.weekly_wrapper}>
            <Text style={styles.weekly_date}>14일(목)</Text>
            <MaterialCommunityIcons name="weather-cloudy" size={24} color="black" />
            <Text style={styles.weekly_temp}>27 / 24</Text>

          </View>

          <View style={styles.weekly_wrapper}>
            <Text style={styles.weekly_date}>14일(목)</Text>
            <MaterialCommunityIcons name="weather-cloudy" size={24} color="black" />
            <Text style={styles.weekly_temp}>27 / 24</Text>

          </View>

        </ScrollView>
      </LinearGradient>
    )
  } else {
    return <Text>Loading</Text>
  }
}

const styles = StyleSheet.create({
  appLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1
  },
  top_container: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center"
  },
  top_wapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    fontSize: 25,
    fontWeight: "500",
    fontFamily: "Bazzi"
  },
  main_wrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  main_date: {
    fontSize: 50,
    fontWeight: "500",
    fontFamily: "Bazzi"
  },
  main_temp: {
    fontSize: 50,
    fontWeight: "500",
    fontFamily: "Bazzi",
    fontFamily: "Bazzi"
  },
  main_icon: {
    fontSize: 50,
    fontWeight: "500"
  },
  main_weather: {
    fontSize: 30,
    fontWeight: "500",
    marginLeft: 10,
    fontFamily: "Bazzi"
  },
  main_desc: {
    flex: 0.8,
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Bazzi"
  },
  main_hum: {
    flex: 1,
    alignItems: "center"
  },
  main_sun: {
    flex: 1,
    alignItems: "center"
  },
  main_humid: {
    fontSize: 20,
    fontWeight: "500",
    alignContent: "center",
    fontFamily: "Bazzi"
  },
  main_sunrise: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Bazzi"
  },
  main_sunset: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Bazzi"
  },
  weekly_container: {
    maxHeight: 200
  },
  weekly_wrapper: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center"
  },
  weekly_date: {
    fontSize: 25,
    fontWeight: "500",
    fontFamily: "Bazzi"
  },
  weekly_weather: {
    fontSize: 25,
    fontWeight: "500",
    fontFamily: "Bazzi"
  },
  weekly_temp: {
    fontSize: 25,
    fontWeight: "500",
    fontFamily: "Bazzi"
  }
});