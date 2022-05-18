import styled from "styled-components";

export const Wrapper = styled.div`
  
`

export const Title = styled.div`
  
`

export const Hours = styled.div`
  height: 50px;
  display: flex;
  
`

export const Hour = styled.div`
  height: 100%;
  display: flex;
  align-items: end;
`

export const HourBar = styled.div<{height:number}>`
  width: 30px;
  height: ${props=>props.height*100}%;
  background-color: black;
`