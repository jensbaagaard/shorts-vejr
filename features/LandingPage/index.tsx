import * as S from "./LandingPage.styled"
import {Status} from "../../pages";
import {useEffect} from "react";

interface LandingPageProps {
    ip: string
    loc: any
    status: Status
}

export interface WeatherData {
    date: Date,
    airTemperature: number
    perceivedTemperature: number
    cloudAreaFraction: number
    humidity: number
    windSpeed: number
    airPressureAtSeaLevel:number
}

export function calculatePerceivedTemperature(airTemperature: number, humidity: number, windSpeed: number,airPressureAtSeaLevel:number) {
    return airTemperature + 0.348 * ((humidity/100)*airPressureAtSeaLevel) - 0.7 * windSpeed + 0.7
}

export async function getWeatherData(lat: number, lon: number) {
    const yrNoWeather = await fetch(` https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`, {
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
            perceivedTemperature: calculatePerceivedTemperature(
                h.data.instant.details.air_temperature,
                h.data.instant.details.relative_humidity,
                h.data.instant.details.wind_speed,
                h.data.instant.details.air_pressure_at_sea_level
                )
        })
    )
    return weatherData
}

const LandingPage = ({ip, loc, status}: LandingPageProps) => {
    useEffect(() => {
        if (status !== "OK") return
        (async () => {
            const weatherData = await getWeatherData(loc.lat, loc.lon)
            console.log(weatherData)

        })();
    }, [])
    return (
        <S.Wrapper>
            {`status: ${status} \n${ip} \n${loc.city}`}
        </S.Wrapper>
    )
}

export default LandingPage