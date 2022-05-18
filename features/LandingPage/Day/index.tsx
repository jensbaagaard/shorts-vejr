import * as S from "./Day.styled"
import {findColdestHour, findWarmestHour, WeatherData} from "../../weather";
import {useEffect, useState} from "react";

interface DayProps {
    data: WeatherData[]
}

type Warmth = "cold" | "medium" | "warm"

interface WeaterDataWithVisual extends WeatherData {
    height: number
    warmth: Warmth
}

function calculateHeight(data:WeatherData[]){
    const max = findWarmestHour(data)
    const min = findColdestHour(data)
    const weatherDataWithVisual: WeaterDataWithVisual[] = []
    for (let i = 0; i < data.length; i++) {
        weatherDataWithVisual.push({
            ...data[i],
            height: (data[i].perceivedTemperature - min.perceivedTemperature) / (max.perceivedTemperature - min.perceivedTemperature),
            warmth: "warm"
        })
    }
    return weatherDataWithVisual
}

const Day = ({data}: DayProps) => {
    const [hours,setHours] = useState<WeaterDataWithVisual[]>([])
    useEffect(() => {
        setHours(calculateHeight(data))

    }, [data])
    return (
        <S.Wrapper>
            <S.Hours>
                {hours.map(h=><S.Hour>
                    <S.HourBar height={h.height}/>
                </S.Hour>)}
            </S.Hours>
        </S.Wrapper>
    )
}

export default Day