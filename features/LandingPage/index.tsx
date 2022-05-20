import * as S from "./LandingPage.styled"
import {Status} from "../../pages";
import {useEffect, useState} from "react";
import {getWeatherData, WeatherData} from "../weather";
import Day from "./Day";
import {isSameDay} from "date-fns";
import ColdResistanceSlider from "../ColdResistanceSlider";
import Location from "../Location";
import PoweredBy from "../PoweredBy";

interface LandingPageProps {
    ip: string
    loc: any
    status: Status
}


const LandingPage = ({ip, loc, status}: LandingPageProps) => {
    const [weatherData, setWeatherData] = useState<WeatherData[]|undefined>()
    const [date] = useState(new Date())
    const [coldResistance, setColdResistance] = useState(2)

    useEffect(() => {
        if (status !== "OK") return
        (async () => {
            const wd = await getWeatherData(loc.lat, loc.lon)
            setWeatherData(wd)
            //console.log(wd)
            console.log(`status: ${status} \n${ip} \n${loc.city}`)
        })();
    }, [])

    function handleColdResistanceChange(value:number) {
        setColdResistance(value);
    }

    async function updatePos(pos:[number,number]) {
        const wd = await getWeatherData(pos[0], pos[1])
        setWeatherData(wd)
        return true
    }

    return (
        <S.Wrapper>
            {weatherData &&
            <>
                <Location city={loc.city} onPosGotten={updatePos}/>
                <Day data={weatherData.filter(h => isSameDay(h.date, date))}/>
                <S.ColdResistanceSliderWrapper>
                    <ColdResistanceSlider value={coldResistance} onChange={handleColdResistanceChange}/>
                </S.ColdResistanceSliderWrapper>
                <S.PoweredByWrapper>
                    <PoweredBy/>

                </S.PoweredByWrapper>
            </>
            }
        </S.Wrapper>
    )
}

export default LandingPage