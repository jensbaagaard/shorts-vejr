import * as S from "./Day.styled"
import {findColdestHour, findWarmestHour, WeatherData} from "../../weather";
import {useEffect, useState} from "react";
import {TempIcon} from "./icons/Temp";
import {WindIcon} from "./icons/Wind";
import {SunIcon} from "./icons/Sun";

interface DayProps {
    data: WeatherData[]
}

export type Warmth = "cold" | "medium" | "warm" | "noData" | "lastHour"

interface WeaterDataWithVisual extends WeatherData {
    height: number
    warmth: Warmth
}

function calculateVisualData(data:WeatherData[]){
    let max = data[0]
    let min = data[0]
    for (let i = 0; i < data.length; i++) {
        if(data[i].perceivedTemperature > max.perceivedTemperature)
            max = data[i]
        if(data[i].perceivedTemperature < min.perceivedTemperature)
            min = data[i]
    }

    const weatherDataWithVisual: WeaterDataWithVisual[] = []
    for (let i = 0; i < data.length; i++) {
        weatherDataWithVisual.push({
            ...data[i],
            height: (data[i].perceivedTemperature - min.perceivedTemperature) / (max.perceivedTemperature - min.perceivedTemperature),
            warmth: "warm"
        })
    }
    return {
        min:min,
        max:max,
        data:weatherDataWithVisual
    }
}

const Day = ({data}: DayProps) => {
    const [hours,setHours] = useState<WeaterDataWithVisual[]>([])
    const [warmestHour,setWarmestHour] = useState<WeatherData|undefined>()
    useEffect(() => {
        const vd = calculateVisualData(data);
        setHours(vd.data)
        setWarmestHour(vd.max)

    }, [data])
    return (
        <S.Wrapper>
            {warmestHour &&
                <>
                    <S.Top>
                        <S.FlexColum>

                            <S.IconWrapper>
                                <TempIcon/>
                            </S.IconWrapper>
                            <S.IconText>
                                {Math.round(warmestHour.perceivedTemperature)}deg
                            </S.IconText>
                        </S.FlexColum>
                        <S.FlexColum>

                            <S.IconWrapper>
                                <WindIcon/>
                            </S.IconWrapper>
                            <S.IconText>
                                {warmestHour.windSpeed}ms
                            </S.IconText>
                        </S.FlexColum>
                        <S.FlexColum>

                            <S.IconWrapper>
                                <SunIcon/>
                            </S.IconWrapper>
                            <S.IconText>
                                {Math.round((warmestHour.cloudAreaFraction-100)*-1)}%
                            </S.IconText>
                        </S.FlexColum>
                    </S.Top>

                    <S.Title>
                        {warmestHour.perceivedTemperature > 18? "Det er’d":"nix"}
                    </S.Title>
                </>
            }
            <S.Hours>
                {hours.map(h=><S.Hour>
                    <S.HourBar height={h.height} warmth={h.warmth}/>
                </S.Hour>)}
            </S.Hours>
        </S.Wrapper>
    )
}

export default Day