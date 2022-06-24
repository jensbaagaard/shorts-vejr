import * as S from "./TextRain.styled"

interface TextRainProps{
    size:[number,number],
    text:string[]
    textSpeed:[number,number],
    rotation:[number,number],
    opacity:[number,number]
    spawnInterval:number,
    time:number
}
const TextRain = (p:TextRainProps) => {

    return (
        <S.Wrapper>
            <Text size={12} text={"🔥"} rotation={0} opacity={1} textSpeed={2000}/>
        </S.Wrapper>
    )
}

export default TextRain

export interface TextProps{
    size:number,
    text:string
    rotation:number,
    opacity:number
    textSpeed:number
}
const Text = (p:TextProps) => {
    return(
        <S.Rain {...p}>{p.text}</S.Rain>
    )
}