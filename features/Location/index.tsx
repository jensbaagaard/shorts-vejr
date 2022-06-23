import * as S from "./Location.styled"
import Icon from "./LocationIcon";
import LocationIcon from "./LocationIcon";
import {useState} from "react";

interface LocationProps {
    city: string,

    onPosGotten:(pos: [number, number]) => Promise<boolean>
}

const Location = ({city,onPosGotten}: LocationProps) => {
    const [updatedPos, setUpdatedPos] = useState(false)
    async function success(e: any) {
        const done = await onPosGotten([e.coords.latitude,e.coords.longitude])
        if(done) setUpdatedPos(true)
    }

    function error(e:any) {
        console.log(e)
    }

    function getPos() {
        if(updatedPos) return;
        navigator.geolocation.getCurrentPosition(success, error);
    }

    return (
        <S.Wrapper onClick={getPos}>
            <S.Text>{updatedPos? "Din lokation" : city}</S.Text>
            <S.IconWrapper>
                <LocationIcon/>
            </S.IconWrapper>
        </S.Wrapper>
    )
}

export default Location