import * as S from "./ColdResistanceSlider.styled"
import {ChangeEvent, useEffect, useState} from "react";

interface ColdResistanceSliderProps{
    value:number,
    onChange:(value:number)=>void
}

const ColdResistanceSlider = ({value,onChange}:ColdResistanceSliderProps) => {
    function handleOnChange(e:ChangeEvent<HTMLInputElement>) {
        onChange(+e.currentTarget.value)
    }

    return (
        <S.Wrapper>
            <S.Input type={"range"}
                     value={value}
                     onChange={handleOnChange}
                     min={1}
                     max={5}
                     style={{
                         width: "100%",
                     }}

            />
        </S.Wrapper>
    )
}

export default ColdResistanceSlider