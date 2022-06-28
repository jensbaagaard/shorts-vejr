import * as S from "./TextRain.styled"
import {ReactNode, useEffect, useState} from "react";
import {v4} from "uuid"

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
    const [texts, setTexts] = useState<TextProps[]>([])

    function removeText(id: string) {
        console.log(id)
        //setTexts(texts.filter(t => t.id !== id))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTexts(texts => [...texts, {
                id: v4(),
                size: randomIntFromInterval(p.size[0], p.size[1]),
                text: p.text[Math.round(Math.random() * p.text.length)],
                rotation: randomIntFromInterval(p.rotation[0], p.rotation[1]),
                opacity: randomIntFromInterval(p.opacity[0], p.opacity[1]),
                textSpeed: randomIntFromInterval(p.textSpeed[0], p.textSpeed[1]),
                left: Math.random() * 100,
                animationCallback: function () {
                    removeText(this.id)
                }
            }
            ])
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
            {texts.map((t) => <Text {...t} key={t.id}/>)}
        </S.Wrapper>
    )
}

export default TextRain

export interface TextProps {
    id: string,
    size: number,
    text: string
    rotation: number,
    opacity: number
    textSpeed: number
    left: number
    animationCallback: () => void
}

const Text = (p: TextProps) => {
    useEffect(() => {
        const timeout = setTimeout(p.animationCallback, p.textSpeed)
        return () => {
            clearTimeout(timeout)
        }
    }, [])
    return (
        <S.Rain {...p}>{p.text}</S.Rain>
    )
}