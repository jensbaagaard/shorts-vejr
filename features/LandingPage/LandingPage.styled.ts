import styled from "styled-components";

export const Wrapper = styled.div`
  white-space: break-spaces;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  gap: 16px
`

export const ColdResistanceSliderWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 32px;
  margin-top: 32px;
`

export const PoweredByWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  height: 150px;
  width: 150px;
  @media(max-width: 1000px){
    height: 100px;
    width: 100px;
  }
  @media(max-width: 500px){
    height: 75px;
    width: 75px;
  }


`