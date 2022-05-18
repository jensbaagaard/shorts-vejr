import * as S from "./LandingPage.styled"
import {Status} from "../../pages";
import {useEffect, useState} from "react";
import {getWeatherData, WeatherData} from "../weather";
import Day from "./Day";
import {addDays, isSameDay} from "date-fns";

interface LandingPageProps {
    ip: string
    loc: any
    status: Status
}


const LandingPage = ({ip, loc, status}: LandingPageProps) => {
    const [weatherData, setWeatherData] = useState<WeatherData[]|undefined>()
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        if (status !== "OK") return
        (async () => {
            const wd = await getWeatherData(loc.lat, loc.lon)
            setWeatherData(wd)
            console.log(wd)
        })();
    }, [])
    return (
        <S.Wrapper>
            {weatherData &&
            <>
                <Day data={weatherData.filter(h => isSameDay(h.date, date))}/>
                <button onClick={() => {
                    setDate(addDays(date, 1))
                }}>next day
                </button>
            </>
            }

            {`status: ${status} \n${ip} \n${loc.city}`}
        </S.Wrapper>
    )
}

export default LandingPage