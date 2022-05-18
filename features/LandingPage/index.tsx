import * as S from "./LandingPage.styled"
import {Status} from "../../pages";
import {useEffect, useState} from "react";
import {getWeatherData, WeatherData} from "../weather";

interface LandingPageProps {
    ip: string
    loc: any
    status: Status
}


const LandingPage = ({ip, loc, status}: LandingPageProps) => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([])
    useEffect(() => {
        if (status !== "OK") return
        (async () => {
            setWeatherData(await getWeatherData(loc.lat, loc.lon))
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