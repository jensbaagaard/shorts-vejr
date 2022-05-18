export interface WeatherData {
    date: Date,
    airTemperature: number
    perceivedTemperature: number
    cloudAreaFraction: number
    humidity: number
    windSpeed: number
    airPressureAtSeaLevel:number
}

export function dewPoint(Tc:number, R:number) {
    if (Tc < 0 || Tc > 60) {
        return Tc;
    }

    if (R < 0.01 || R > 1) {
        return Tc;
    }

    let a = 17.27;
    let b = 237.7;

    let alphaTR = ((a * Tc) / (b + Tc)) + Math.log(R);

    let Tr = (b * alphaTR) / (a - alphaTR);

    if (Tr < 0 || Tr > 50) {
        return Tc;
    }

    return Tr;
}

export function heatIndex(Tc:number, R:number, P:number) {
    if (P < 16) {
        return Tc;
    }

    if (Tc < 27 || R < 0.40 || dewPoint(Tc, R) < 12) {
        return Tc;
    }

    let c1 = -8.784695;
    let c2 = 1.61139411;
    let c3 = 2.338549;
    let c4 = -0.14611605;
    let c5 = -1.2308094 * 0.01;
    let c6 = -1.6424828 * 0.01;
    let c7 = 2.211732 * 0.001;
    let c8 = 7.2546 * 0.0001;
    let c9 = -3.582 * 0.000001;

    let HI = c1 + c2 * Tc + c3 * R + c4 * Tc * R + c5 * Tc * Tc + c6 * R * R + c7 * Tc * Tc * R + c8 * Tc * R * R + c9 * Tc * Tc * R * R;

    return HI;
}

export function windChill(Tc:number, Vkmh:number) {
    if (Tc >= 10)
        return Tc;

    let Rc;

    if (Vkmh >= 4.8 && Vkmh <= 177) {
        Rc = 13.12 + 0.6215 * Tc + (0.3965 * Tc - 11.37) * Math.pow(Vkmh, 0.16);
    } else if (Vkmh < 4.8) {
        Rc = Tc + 0.2 * (0.1345 * Tc - 1.59) * Vkmh;
    } else {
        Rc = Tc;
    }

    return Rc;
}

export function apparentTemperature(Tc:number, Vkmh:number, R:number, P:number) {
    if (Tc < 10) {
        return windChill(Tc, Vkmh);
    }

    return heatIndex(Tc, R, P);
}

export async function getWeatherData(lat: number, lon: number) {
    const yrNoWeather = await fetch(` https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, {
        method: "GET",
        credentials: 'same-origin',
    }).then(res => res.json())
    console.log(yrNoWeather)
    let weatherData: WeatherData[] = []
    yrNoWeather.properties.timeseries.map((h: any) =>
        weatherData.push({
            date: new Date(h.time),
            airTemperature: h.data.instant.details.air_temperature,
            cloudAreaFraction: h.data.instant.details.cloud_area_fraction,
            humidity: h.data.instant.details.relative_humidity,
            windSpeed: h.data.instant.details.wind_speed,
            airPressureAtSeaLevel:h.data.instant.details.air_pressure_at_sea_level,
            perceivedTemperature: apparentTemperature(
                h.data.instant.details.air_temperature,
                h.data.instant.details.wind_speed*3.6,
                h.data.instant.details.relative_humidity,
                h.data.instant.details.air_pressure_at_sea_level
            )
        })
    )
    return weatherData
}

export function findWarmestHour(weatherData:WeatherData[]){
    let wh = weatherData[0]
    for (let i = 0; i < weatherData.length; i++) {
        if(weatherData[i].perceivedTemperature > wh.perceivedTemperature)
            wh = weatherData[i]
    }
    return wh
}

export function findColdestHour(weatherData:WeatherData[]){
    let wh = weatherData[0]
    for (let i = 0; i < weatherData.length; i++) {
        if(weatherData[i].perceivedTemperature < wh.perceivedTemperature)
            wh = weatherData[i]
    }
    return wh
}