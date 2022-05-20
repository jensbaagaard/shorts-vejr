import * as S from "./ColdResistanceSlider.styled"
import {useEffect, useState} from "react";

interface ColdResistanceSliderProps{
    value:number,
    onChange:(value:number)=>void
}

const ColdResistanceSlider = ({value,onChange}:ColdResistanceSliderProps) => {
    const [dragging,setDragging] = useState(false)
    useEffect(()=>{

    },[dragging])
    function handleSliderMouseDown() {

    }

    return (
        <S.Wrapper onMouseDown={handleSliderMouseDown}>
            <S.Slider>
            <S.Dot/>
            </S.Slider>
        </S.Wrapper>
    )
}

export default ColdResistanceSlider