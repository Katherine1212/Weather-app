import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const App = () => {
  return (
    <View style={styles.container}>
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
          <Text style={styles.main_humid}>습도 20%</Text>
        </View>
        <View style={styles.main_sun}>
          <Text style={styles.main_sunrise}>일출: </Text>
          <Text style={styles.main_sunset}>일몰: </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top_container: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "teal"
  },
  top_wapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  location: {
    fontSize: 25,
    fontWeight: "500"
  },
  main_wrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  main_date: {
    fontSize: 50,
    fontWeight: "500"
  },
  main_temp: {
    fontSize: 50,
    fontWeight: "500"
  },
  main_icon: {
    fontSize: 50,
    fontWeight: "500"
  },
  main_weather: {
    fontSize: 30,
    fontWeight: "500",
    marginLeft: 10
  },
  main_desc: {
    flex: 0.8,
    flexDirection: "row",
  },
  main_hum: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center"
  },
  main_sun: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center"
  },
  main_humid: {
    fontSize: 30,
    fontWeight: "500",
    alignContent: "center"
  },
  main_sunrise: {
    fontSize: 30,
    fontWeight: "500",
  },
  main_sunset: {
    fontSize: 30,
    fontWeight: "500",
  },
  weekly_container: {
    backgroundColor: "green",
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
  },
  weekly_weather: {
    fontSize: 25,
    fontWeight: "500"
  },
  weekly_temp: {
    fontSize: 25,
    fontWeight: "500"
  }
});

export default App;