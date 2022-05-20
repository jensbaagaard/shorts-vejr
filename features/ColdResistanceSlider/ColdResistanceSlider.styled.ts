import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: none;
`

export const Slider = styled.div`
  height: 6px;
  border-radius: 8px;
  background-color: ${props=>props.theme.bgLight};
  
`

export const Dot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background-color: ${props=>props.theme.bg};
  border: 4px solid outside ${props=>props.theme.bgLight};
`