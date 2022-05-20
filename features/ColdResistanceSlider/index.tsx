import * as S from "./ColdResistanceSlider.styled"

interface ColdResistanceSliderProps{
    value:number,
    onChange:(value:number)=>void
}

const ColdResistanceSlider = ({value,onChange}:ColdResistanceSliderProps) => {

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