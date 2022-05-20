import styled, {css} from "styled-components";
import {Warmth} from "./index";

export const City = styled.div`
  font-family: Poppins, sans-serif;
  font-size: 100px;
  font-weight: 300;
  line-height: 125px;
  color: ${props => props.theme.text};
`

export const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const FlexColum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
`

export const IconText = styled.div`
  margin-top: 16px;
  font-family: Poppins, sans-serif;
  font-size: 22px;
  font-weight: 300;
  line-height: 33px;
  color: ${props => props.theme.textSubtle};

`

export const IconWrapper = styled.div`
  height: 45px;
  width: 45px;
`

export const Title = styled.div`
  font-family: Poppins, sans-serif;
  font-size: 100px;
  font-weight: 300;
  line-height: 125px;
  color: ${props => props.theme.text};
  text-align: center;
  margin: 64px 0;
  @media (max-width: 600px) {
    font-size: 70px;
    line-height: 80px;

  }
`

export const Hours = styled.div`
  height: 46px;
  display: flex;
`

export const Hour = styled.div<{ warmth: Warmth }>`
  cursor: pointer;
  ${props => props.warmth === "noData" && css`
    pointer-events: none;
  `}
  width: 16px;
  justify-content: center;
  height: 100%;
  display: flex;
  align-items: end;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    transition: opacity 200ms;
  }


  @media (max-width: 600px) {
    width: 12px;
  }
`

export const HourBar = styled.div<{ height: number, warmth: Warmth }>`
  width: 8px;
  @media (max-width: 600px) {
    width: 6px;
  }
  border-radius: 4px;
  height: calc(${props => props.height * 100}% + 8px);
  ${props => props.warmth === "warm" && css`
    background-color: ${props => props.theme.green};
  `}
  ${props => props.warmth === "medium" && css`
    background-color: ${props => props.theme.yellow};
  `}
  ${props => props.warmth === "cold" && css`
    background-color: ${props => props.theme.red};
  `}

  ${props => props.warmth === "noData" && css`
    background-color: ${props.theme.bgLight};
    pointer-events: none;
  `}
`

export const SpaceBetween = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
`

export const TimeText = styled.div<{align:string}>`
  margin-top: 4px;
  font-family: Poppins, sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.theme.text};
  text-align: ${props=>props.align};
`