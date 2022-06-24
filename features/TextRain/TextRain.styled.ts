import styled, {keyframes} from "styled-components";
import {TextProps} from "./index";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  pointer-events: none;
  overflow: hidden;
`

const RainAnimation = keyframes`
  0% {  bottom: 0}
  100%{ bottom: 200%}
`

export const Rain = styled.div<TextProps>`
  height: fit-content;
  width: fit-content;
  position: absolute;
  bottom: 0;
  animation-name: ${RainAnimation};
  animation-duration: ${props=> props.textSpeed*2}ms;
  
  font-size: calc(${props=> props.size}px + 2vw);
  transform: rotate(${props=> props.rotation}deg);
  opacity: ${props=> props.opacity};
  
`