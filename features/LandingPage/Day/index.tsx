import * as S from "./Day.styled"
import {WeatherData} from "../../weather";
import {useEffect, useState} from "react";
import {TempIcon} from "./icons/Temp";
import {WindIcon} from "./icons/Wind";
import {SunIcon} from "./icons/Sun";
import {eachHourOfInterval, isSameHour, setHours} from "date-fns";

interface DayProps {
    data: WeatherData[]
    coldResistance:number
}

export type Warmth = "cold" | "medium" | "warm" | "noData" | "lastHour"

interface WeaterDataWithVisual extends WeatherData {
    height: number
    warmth: Warmth
}

function calculateWarmth(temp: number, coldResistance:number): Warmth {
    const warmCutoff = 19+((coldResistance-3)*2);
    if (temp > warmCutoff) return "warm"
    if (temp > (warmCutoff*0.8)) return "medium"
    else return "cold"
}

function calculateVisualData(data: WeatherData[],coldResistance:number) {
    let max = data[0]
    let min = data[0]
    for (let i = 0; i < data.length; i++) {
        if (data[i].perceivedTemperature > max.perceivedTemperature)
            max = data[i]
        if (data[i].perceivedTemperature < min.perceivedTemperature)
            min = data[i]
    }

    const weatherDataWithVisual: WeaterDataWithVisual[] = []
    for (let i = 0; i < data.length; i++) {
        weatherDataWithVisual.push({
            ...data[i],
            height: (data[i].perceivedTemperature - min.perceivedTemperature) / (max.perceivedTemperature - min.perceivedTemperature),
            warmth: calculateWarmth(data[i].perceivedTemperature,coldResistance)
        })
    }
    const startHour = setHours(data[0].date.getTime(), 0)
    const endHour = setHours(data[0].date.getTime(), 23)
    let allHours = eachHourOfInterval({start: startHour, end: endHour}).map(h => ({
        airPressureAtSeaLevel: 0,
        airTemperature: 0,
        cloudAreaFraction: 0,
        date: h,
        height: 0.3,
        humidity: 0,
        perceivedTemperature: 0,
        warmth: "noData",
        windSpeed: 0
    }))
    for (let i = 0; i < allHours.length; i++) {
        let findData = weatherDataWithVisual.find(wd => isSameHour(wd.date, allHours[i].date))
        if (!!findData)
            allHours[i] = findData
    }
    return {
        min: min,
        max: max,
        data: allHours as WeaterDataWithVisual[]
    }
}

function CalculateWarmEnough(wd:WeaterDataWithVisual[],coldResistance:number):boolean{
    const warm = wd.filter(d=>d.warmth === "warm").length
    const medium = wd.filter(d=>d.warmth === "medium").length
    const cold = wd.filter(d=>d.warmth === "cold").length
    if(!medium && !cold) return true
    else return (warm>=4+(coldResistance-3))
}

const Day = ({data,coldResistance}: DayProps) => {
    const [hours, setHours] = useState<WeaterDataWithVisual[]>([])
    const [warmestHour, setWarmestHour] = useState<WeatherData | undefined>()
    const [targetHour, setTargetHour] = useState<WeatherData | undefined>()
    useEffect(() => {
        const vd = calculateVisualData(data,coldResistance);
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
                                {!!targetHour ? Math.round(targetHour.perceivedTemperature) : Math.round(warmestHour.perceivedTemperature)}c°
                            </S.IconText>
                        </S.FlexColum>
                        <S.FlexColum>

                            <S.IconWrapper>
                                <WindIcon/>
                            </S.IconWrapper>
                            <S.IconText>
                                {!!targetHour ? targetHour.windSpeed : warmestHour.windSpeed}ms
                            </S.IconText>
                        </S.FlexColum>
                        <S.FlexColum>

                            <S.IconWrapper>
                                <SunIcon/>
                            </S.IconWrapper>
                            <S.IconText>
                                {!!targetHour ? Math.round((targetHour.cloudAreaFraction - 100) * -1) : Math.round((warmestHour.cloudAreaFraction - 100) * -1)}%
                            </S.IconText>
                        </S.FlexColum>
                    </S.Top>

                    <S.Title>
                        {CalculateWarmEnough(hours,coldResistance) ? "Jep🔥" : "Nix"}
                    </S.Title>
                </>
            }
            <S.FlexColum>
                <S.Hours>
                    {hours.map(h => <S.Hour warmth={h.warmth} onMouseEnter={() => {
                        setTargetHour(h)
                    }} onMouseLeave={() => {
                        setTargetHour(undefined)
                    }}>
                        <S.HourBar height={h.height} warmth={h.warmth}/>
                    </S.Hour>)}
                </S.Hours>
                <S.SpaceBetween>
                    <S.TimeText align={"left"}>0</S.TimeText>
                    <S.TimeText align={"center"}>12</S.TimeText>
                    <S.TimeText align={"right"}>23</S.TimeText>
                </S.SpaceBetween>
            </S.FlexColum>
        </S.Wrapper>
    )
}

export default Day