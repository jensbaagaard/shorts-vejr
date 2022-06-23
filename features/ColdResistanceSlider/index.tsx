import * as S from "./ColdResistanceSlider.styled"
import {ChangeEvent, useEffect, useState} from "react";
import SunhatIcon from "./SunhatIcon";
import VikingIcon from "./VikingIcon";

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
            <S.SunhatWrapper>
                <SunhatIcon/>
            </S.SunhatWrapper>
            <S.Input type={"range"}
                     value={value}
                     onChange={handleOnChange}
                     min={1}
                     max={5}
                     style={{
                         width: "100%",
                     }}

            />
            <S.VikingWrapper>
                <VikingIcon/>
            </S.VikingWrapper>
        </S.Wrapper>
    )
}

export default ColdResistanceSlider