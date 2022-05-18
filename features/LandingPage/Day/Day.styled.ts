import styled, {css} from "styled-components";
import {Warmth} from "./index";

export const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 32px;
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
  gap: 16px;
`

export const IconText = styled.div`
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
  line-height: 150px;
  color: ${props => props.theme.text};
  text-align: center;
  margin: 64px 0;
`

export const Hours = styled.div`
  height: 46px;
  display: flex;
`

export const Hour = styled.div<{warmth:Warmth}>`
  cursor: pointer;
  ${props=> props.warmth === "noData" && css`
    pointer-events: none;
  `}
  width: 16px;
  justify-content: center;
  height: 100%;
  display: flex;
  align-items: end;
  opacity: 0.5;
  &:hover{
    opacity: 1;
    transition: opacity 200ms;
  }
`

export const HourBar = styled.div<{ height: number, warmth:Warmth }>`
  width: 8px;
  border-radius: 4px;
  height: calc(${props => props.height * 100}% + 8px);
  ${props=> props.warmth === "warm" && css`
    background-color:   ${props=>props.theme.green};
  `}
  ${props=> props.warmth === "medium" && css`
    background-color:   ${props=>props.theme.yellow};
  `}
  ${props=> props.warmth === "cold" && css`
    background-color:   ${props=>props.theme.red};
  `}

  ${props=> props.warmth === "noData" && css`
    background-color: ${props.theme.bgLight};
    pointer-events: none;
  `}
`