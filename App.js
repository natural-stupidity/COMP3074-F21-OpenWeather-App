import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions, } from 'react-native';
import * as Location from 'expo-location';
import { MainData, CompressedMainData, MoreInfo } from './components/Current';
import Forecast from './components/Forecast'

const apiKey = '2ce65f761eb182f61b2fbc41ecddc8d1';

const HEADER_EXPANDED_HEIGHT = 600;
const HEADER_COLLAPSED_HEIGHT = 150;
const { width: SCREEN_WIDTH } = Dimensions.get("screen")

export default function App() {

    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [date, setDate] = useState("");
    const [city, setCity] = useState("");
    const [data, setData] = useState({});
    const images = {
        night: require('./assets/night.jpg'),
        lightning: require('./assets/lightning.jpg'),
        rain: require('./assets/rain.jpg'),
        snow: require('./assets/snow.jpg'),
        clear: require('./assets/clear.jpg'),
        clouds: require('./assets/clouds.jpg'),
        mist: require('./assets/mist.jpg'),
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const addOrdinal = function (d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
        extrapolate: 'clamp'
    });
    const largeHeader = scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });
    const smallHeader = scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const BackgroundItem = ({ weather, time, sunrise, sunset }) => {
        let img = "";
        if (weather === "Clear" && (time < sunrise || time > sunset)) img = images.night;
        else {
            if (weather === "Thunderstorm") img = images.lightning;
            else if (weather === "Rain" || weather ==="Drizzle") img = images.rain;
            else if (weather === "Snow") img = images.snow;
            else if (weather === "Clear") img = images.clear;
            else if (weather === "Clouds") img = images.clouds;
            else img = images.mist;
        }
        return (
            <Animated.Image source={img} style={[styles.header, { height: headerHeight }]} />
        )
    }

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            let latitude = "34.0522", longitude = "-79.4108";
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                latitude = location.coords.latitude;
                longitude = location.coords.longitude;
            }
            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`).then(response => response.json()).then(cityInfo => {
                //console.log(cityInfo);
                setCity(cityInfo[0].name);
            })
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {
                //console.log(data);
                setData(data);

                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate() + addOrdinal(currentDate.getDate());
                const day = currentDate.getDay();

                setDate(days[day] + ", " + months[month] + " " + date + ", " + year)
            })
        })();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#18181bcc', }}>
            {data.daily && data.daily.length > 0 ?
                <BackgroundItem weather={data.current.weather[0].main} time={new Date().getTime()} sunrise={data.current.sunrise} sunset={data.current.sunset} />
                : <Animated.Image source={images.night} style={[styles.header, { height: headerHeight }]} />
            }
            {data.daily && data.daily.length > 0 ?
                <Animated.View style={[styles.header, { height: headerHeight }]}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20, }}>
                        <View><Text style={{ fontSize: 18, color: 'white', fontWeight: '300' }}>{date}</Text></View>
                    </View>

                    <MainData data={data} city={city} op={largeHeader} />
                    <MoreInfo data={data} op={largeHeader} />
                    <CompressedMainData city={city} data={data} op={smallHeader} />
                </Animated.View> : null
            }

            <Forecast heh={HEADER_EXPANDED_HEIGHT} scrollY={scrollY} data={data} op1={largeHeader} op2={smallHeader} screenWidth={{ width: SCREEN_WIDTH - 50 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1.5,
        justifyContent: 'space-between',
        padding: 15,
        resizeMode: "cover",
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: 0,
        left: 0,
        zIndex: 1,
    },
});