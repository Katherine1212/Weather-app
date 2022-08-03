import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { API_KEY, URL } from './config.json';

const timestamp_to_date = (timestamp) => {
  let date = new Date(timestamp * 1000);
  date = date.toString();
  // 날짜
  const original_day = date.split('2022')[0];
  const week = change_week(original_day.split(" ")[0]);
  const month = change_month(original_day.split(" ")[1]);
  const day = original_day.split(" ")[2];
  // 월 일 (요일)
  const full_day = `${month} ${day}일 (${week})`;
  // 일 (요일)
  const day_week = `${day}일 (${week})`
  // 일출 일몰용 시간
  let time = date.split('2022')[1];
  time = time.split('GMT')[0];
  return { full_day, day_week, time };
}
const change_week = (original_week) => {
  let week = "";
  switch (original_week) {
    case "Mon":
      week = "월"
      break;
    case "Tue":
      week = "화"
      break;
    case "Wed":
      week = "수"
      break;
    case "Thu":
      week = "목"
      break;
    case "Fri":
      week = "금"
      break;
    case "Sat":
      week = "토"
      break;
    case "Sun":
      week = "일"
      break;
  }
  return week
}
const change_month = (original_month) => {
  let month = "";
  switch (original_month) {
    case "Jan":
      month = "1월"
      break;
    case "Feb":
      month = "2월"
      break;
    case "Mar":
      month = "3월"
      break;
    case "Apr":
      month = "4월"
      break;
    case "May":
      month = "5월"
      break;
    case "Jun":
      month = "6월"
      break;
    case "Jul":
      month = "7월"
      break;
    case "Aug":
      month = "8월"
      break;
    case "Sep":
      month = "9월"
      break;
    case "Oct":
      month = "10월"
      break;
    case "Nov":
      month = "11월"
      break;
    case "Dec":
      month = "12월"
      break;
  }
  return month
}

export default function App() {
  // const Screen_width = Dimensions.get("window").width;
  const [fontLoad, setFontLoad] = useState(false);
  const [location, setLocation] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [ready, setReady] = useState(false);

  // 폰트 등록
  const Load = async () => {
    await Font.loadAsync({
      "Bazzi": require('./assets/fonts/Bazzi.ttf')
    })
    setFontLoad(true);
    return setFontLoad(true);
  }
  // 날씨정보
  const getWeather = async () => {
    // 위치 사용 권한 여부
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setReady(false);
    }

    // 현 유저의 위도와 경도 가져오기. (accuracy는 1~6까지 있으며 숫자가 높을 수록 정확함)
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // 위에서 구한 위.경도값으로 지역 추출
    const my_location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setLocation(my_location[0]);
    // openweather api 사용
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&appid=${API_KEY}`);
    const json = await resp.json();
    setDays(json.daily);
    if (location !== undefined) {
      setCheckData(true);
    }
  }

  useEffect(() => {
    getWeather();
    Load();
  }, []);
  return (
    !checkData ? <View style={{ ...styles.top_container, alignItems: "center" }}><ActivityIndicator style={{ marginTop: 50 }} size="large" color={"black"} /></View> :
      (<LinearGradient style={{ ...styles.container }} colors={['#7F7FD5', '#86A8E7', '#91EAE4']}>
        <StatusBar style="dark" />
        <View style={styles.top_container}>
          <View style={styles.top_wapper}>
            <MaterialIcons name="location-on" size={24} color="black" style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.location}> {location.region} {location.district} {location.street}</Text>
            </MaterialIcons>
          </View>
          <Text style={styles.main_date}>{timestamp_to_date(days[0].dt).full_day}</Text>
          <View style={styles.main_wrapper}>
            <Text style={styles.main_temp}>{Math.round(days[0].temp.day)}°C</Text>
            <Image source={{ uri: `https://openweathermap.org/img/wn/${days[0].weather[0].icon}@2x.png` }} style={{ width: 100, height: 50 }} />
            <Text style={styles.main_weather}>{days[0].weather[0].main}</Text>
          </View>
        </View>

        <View style={styles.main_desc}>
          <View style={styles.main_hum}>
            <MaterialCommunityIcons name="water" size={25} color="black">
              <Text style={styles.main_humid}>습도 {days[0].humidity}%</Text>
            </MaterialCommunityIcons>
          </View>
          <View style={styles.main_sun}>
            <MaterialCommunityIcons name="weather-sunset-up" size={25} color="black">
              <Text style={styles.main_sunrise}>일출: {timestamp_to_date(days[0].sunrise).time}</Text>
            </MaterialCommunityIcons>
            <MaterialCommunityIcons name="weather-sunset-down" size={25} color="black">
              <Text style={styles.main_sunset}>일몰: {timestamp_to_date(days[0].sunset).time}</Text>
            </MaterialCommunityIcons>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // ScrollIndicator delete.
          contentContainerStyle={styles.weekly_container} >
          {days.length === 0 ? <View style={{ ...styles.day_container, alignItems: "center" }}><ActivityIndicator style={{ marginTop: 10 }} size="large" color={"white"} /></View> : (
            days.map((days, index) =>
              <View key={index} style={styles.weekly_wrapper} >
                <Text style={styles.weekly_date}>{timestamp_to_date(days.dt).day_week}</Text>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${days.weather[0].icon}@2x.png` }} style={{ width: 80, height: 50 }} />
                <Text style={styles.weekly_temp}>{Math.round(days.temp.min)}°C / {Math.round(days.temp.max)}°C</Text>
              </View>
            )
          )}
        </ScrollView>
      </LinearGradient>)
  )
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
    fontSize: 25,
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