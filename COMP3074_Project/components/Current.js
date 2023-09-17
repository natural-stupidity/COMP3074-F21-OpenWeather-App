import React from 'react';
import { StyleSheet, View, Text, Image, Animated, } from 'react-native';
import moment from 'moment-timezone';

const MainData = ({ data, city, op }) => {
    return (
        <Animated.View style={{ justifyContent: "center", alignItems: 'center', padding: 15, opacity: op}}>
            <Text style={{ fontSize: 25, color: "white", backgroundColor: "#3c3c44", padding: 10, textAlign: "center", borderRadius: 50, fontWeight: "200", top: 5, bottom: 5,}}>📍 {city} </Text>
            <Text style={{ fontSize: 50, color: 'white', paddingTop: 10, }}>{(data.current.temp).toFixed(0)}&#176;C</Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', }}>{data.current.weather[0].main}</Text>
            <Text style={{ fontSize: 20, color: 'white', }}>{data.daily[0].temp.max.toFixed(0)}&#176; / {data.daily[0].temp.min.toFixed(0)}&#176;&#09;&#09;Feels Like: {data.current.feels_like.toFixed(0)}&#176;</Text>
        </Animated.View>
    )
}

const CompressedMainData = ({ data, city, op }) => {
    return (
        <Animated.View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginTop: -20, marginBottom: -20, paddingRight: 20, paddingLeft: 20, top: -325, opacity: op }}>
            <Text style={{ fontSize: 20, color: 'white', }}>{city}</Text>
            <Image source={{ uri: 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@4x.png' }} style={styles.image} />
            <Text style={{ fontSize: 20, color: 'white', }}>{(data.current.temp).toFixed(0)}&#176;C</Text>
        </Animated.View>
        )
}

const MoreInfo = ({ data, op }) => {
    return (
        <Animated.View style={[styles.moreInfoContainer, { opacity: op }]}>
            <View style={styles.moreInfoRow}>
                <MoreInfoItem category="Humidity" symbol="💧" value={data.current ? data.current.humidity : ""} unit="%" />
                <MoreInfoItem category="Pressure" symbol="⏲️" value={data.current ? data.current.pressure : ""} unit=" hPA" />
                <MoreInfoItem category="Wind" symbol="🍃" value={data.current ? data.current.wind_speed.toFixed(0) + " m/s " + getWindDirection(data.current.wind_speed) : ""} unit="" />
            </View>
            <View style={styles.moreInfoRow}>
                <MoreInfoItem category="Sunrise" symbol="☀️" value={data.current ? moment.tz(data.current.sunrise * 1000, data.timezone).format('h:mm A') : ""} unit="" />
                <MoreInfoItem category="Sunset" symbol="🌙" value={data.current ? moment.tz(data.current.sunset * 1000, data.timezone).format('h:mm A') : ""} unit="" />
            </View>
        </Animated.View>
        )
}

const MoreInfoItem = ({ category, symbol, value, unit }) => {
    return (
        <View style={styles.moreInfoItem}>
            <Text style={styles.moreInfoCategory}>{category}</Text>
            <Text style={styles.moreInfoValue}>{symbol} {value}{unit}</Text>
        </View>
    )
}

const getWindDirection = function (angle) {
        let directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        let index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
        return directions[index];
    }

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100
    },
    moreInfoContainer: {
        backgroundColor: "#18181b99",
        borderRadius: 10,
        padding: 10,
        marginTop: 10
    },
    moreInfoRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 10,
    },
    moreInfoItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    moreInfoCategory: {
        color: '#eee',
        fontSize: 20,
        fontWeight: '300'
    },
    moreInfoValue: {
        color: '#eee',
        fontSize: 15,
        fontWeight: '100'
    }
})

export {
    MainData,
    CompressedMainData,
    MoreInfo,
}