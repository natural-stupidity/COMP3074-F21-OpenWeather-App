import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Animated, } from 'react-native';
import moment from 'moment-timezone';

const Title = ({ op, pb }) => {
    return (
        <View style={{ alignItems: 'center', }}>
            <Animated.View style={{ width: 25, height: 3, backgroundColor: 'white', borderRadius: 15, top: 10, opacity: op, }}></Animated.View>
            <Animated.Text style={{ textAlign: 'center', fontSize: 20, color: 'white', top: 10, paddingBottom: pb, opacity: op, }}>Forecast</Animated.Text>
        </View>
    )
}

const SmallForecast = ({ data, op }) => {
    return (
        <Animated.View style={{ marginTop: 30, flexDirection: 'row', opacity: op }}>
            {data.daily && data.daily.length > 0 ?
                (data.daily).map((forecast, index) => (
                    index !== 0 && index !== 7 &&
                    <View key={index} style={styles.forecastItemRow}>
                        <Text style={styles.forecastDayRow}>{moment(forecast.dt * 1000).format('ddd')}</Text>
                        <Image style={styles.forecastIconRow} source={{ uri: "http://openweathermap.org/img/wn/" + forecast.weather[0].icon + "@2x.png" }} />
                    </View>
                ))
                : null
            }
        </Animated.View>
    )
}


const LargeForecast = ({ data, op, screenWidth }) => {
    return (
        <Animated.View style={{ flexDirection: 'column', opacity: op, paddingBottom: 180 }}>
            {data.daily && data.daily.length > 0 ?
                (data.daily).map((forecast, index) => (
                    index !== 0 && index !== 7 &&
                    <View key={index} style={[styles.forecastItemColumn, screenWidth ]}>
                        <Image style={styles.forecastIconColumn} source={{ uri: "http://openweathermap.org/img/wn/" + forecast.weather[0].icon + "@2x.png" }} />
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={styles.forecastDayColumn}>{moment(forecast.dt * 1000).format('dddd')}</Text>
                            <Text style={styles.forecastDayColumn}>{forecast.weather[0].main}</Text>
                        </View>
                        <Text style={styles.forecastTemp}>{forecast.temp.day}&#176;C</Text>
                    </View>
                ))
                : null
            }
        </Animated.View>
    )
}

const Forecast = ({ heh, scrollY, data, op1, op2, screenWidth }) => {
    return (
        <ScrollView
            contentContainerStyle={{ padding: 16, paddingTop: heh, alignItems: 'center', }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            scrollEventThrottle={16}>

            <Title op={op1} pb={0} />
            <SmallForecast data={data} op={op1} />

            <Title op={op2} pb={15} />
            <LargeForecast data={data} op={op2} screenWidth={ screenWidth } />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100
    },
    forecastItemRow: {
        justifyContent: 'center',
        backgroundColor: '#00000033',
        borderRadius: 10,
        borderColor: "#eee",
        borderWidth: 1,
        padding: 5,
    },
    forecastDayRow: {
        fontSize: 15,
        color: "white",
        textTransform: 'uppercase',
        textAlign: "center",
        fontWeight: "200",
        marginBottom: 5,
    },
    forecastIconRow: {
        width: 50,
        height: 50
    },
    forecastItemColumn: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: '#00000033',
        borderRadius: 10,
        borderColor: "#EEE",
        borderWidth: 1,
        marginBottom: 15,
        alignItems: 'center',
    },
    forecastDayColumn: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
        fontWeight: "200",
    },
    forecastIconColumn: {
        width: 100,
        height: 100,
        marginRight: -20,
    },
    forecastTemp: {
        fontSize: 18,
        color: "white",
        fontWeight: "100",
        textAlign: "center",
        marginRight: 15,
    },
    scrollView: {
        flex: 0.4,
        backgroundColor: '#18181bcc',
    },
})

export default Forecast;
