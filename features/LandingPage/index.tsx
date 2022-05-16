import * as S from "./LandingPage.styled"
import {useEffect} from "react";

interface LandingPageProps {
    ip: string
    loc: any
}

const LandingPage = ({ip, loc}: LandingPageProps) => {
    console.log(loc)
    return (
        <S.Wrapper>
            {ip}
        </S.Wrapper>
    )
}

export default LandingPage