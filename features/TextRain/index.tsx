import * as S from "./TextRain.styled"
import {ReactNode, useEffect, useState} from "react";

function randomIntFromInterval(min: number, max: number) {
    return (Math.random() * (max - min + 1) + min)
}

interface TextRainProps {
    size: [number, number],
    text: string[]
    textSpeed: [number, number],
    rotation: [number, number],
    opacity: [number, number]
    spawnInterval: number,
    time: number
}

const TextRain = (p: TextRainProps) => {
    const [texts, setTexts] = useState<ReactNode[]>([])
    useEffect(() => {
        const interval = setInterval(() => {
            setTexts(texts => [...texts, <Text size={randomIntFromInterval(p.size[0], p.size[1])}
                                               text={p.text[Math.round(Math.random() * p.text.length)]}
                                               rotation={randomIntFromInterval(p.rotation[0], p.rotation[1])}
                                               opacity={randomIntFromInterval(p.opacity[0], p.opacity[1])}
                                               textSpeed={randomIntFromInterval(p.textSpeed[0], p.textSpeed[1])}
                                               left={Math.random() * 100}/>])
        }, p.spawnInterval)

        const timeout = setTimeout(() => {
            clearInterval(interval)
        }, p.time)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])
    return (
        <S.Wrapper>
            {texts}
        </S.Wrapper>
    )
}

export default TextRain

export interface TextProps {
    size: number,
    text: string
    rotation: number,
    opacity: number
    textSpeed: number
    left: number
}

const Text = (p: TextProps) => {

    return (
        <S.Rain {...p}>{p.text}</S.Rain>
    )
}