import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Animated, } from 'react-native';
import moment from 'moment-timezone';

const Title = ({ op, pb }) => {
    return (
        <View style={{ alignItems: 'center', }}>
            <Animated.View style={{ width: 25, height: 3, backgroundColor: 'white', borderRadius: 15, top: 15, opacity: op, }}></Animated.View>
            <Animated.Text style={{ textAlign: 'center', fontSize: 20, color: 'white', top: 20, paddingBottom: pb, opacity: op, }}>Forecast</Animated.Text>
        </View>
    )
}

const SmallForecast = ({ data, op }) => {
    return (
        <Animated.View style={{ marginTop: 45, marginLeft: -16, flexDirection: 'row', opacity: op, position: 'absolute' }}>
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
        <Animated.View style={{ flexDirection: 'column', opacity: op, paddingBottom: 35, marginTop: 45, }}>
            {data.daily && data.daily.length > 0 ?
                (data.daily).map((forecast, index) => (
                    index !== 0 && index !== 7 &&
                    <View key={index} style={[styles.forecastItemColumn, screenWidth ]}>
                        <Image style={styles.forecastIconColumn} source={{ uri: "http://openweathermap.org/img/wn/" + forecast.weather[0].icon + "@2x.png" }} />
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={styles.forecastDayColumn}>{moment(forecast.dt * 1000).format('dddd, MMMM Do')}</Text>
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
            contentContainerStyle={{ paddingTop: heh, alignItems: 'center', }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            scrollEventThrottle={16}>

            <Title pb={0} />
            <View>
                <SmallForecast data={data} op={op1} />
                <LargeForecast data={data} op={op2} screenWidth={ screenWidth } />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    forecastItemRow: {
        justifyContent: 'center',
        backgroundColor: '#00000033',
        borderRadius: 10,
        borderColor: "#eee",
        borderWidth: 1,
        padding: 4,
        marginHorizontal: 3,
    },
    forecastDayRow: {
        fontSize: 15,
        color: "white",
        textTransform: 'uppercase',
        textAlign: "center",
        fontWeight: "400",
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
        height: 90,
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
        marginVertical: 5,
    },
    forecastIconColumn: {
        width: 100,
        height: 100,
        marginRight: -20,
    },
    forecastTemp: {
        fontSize: 18,
        color: "white",
        fontWeight: "200",
        textAlign: "center",
        marginRight: 15,
    },
    scrollView: {
        flex: 0.4,
        backgroundColor: '#18181bcc',
    },
})

export default Forecast;
