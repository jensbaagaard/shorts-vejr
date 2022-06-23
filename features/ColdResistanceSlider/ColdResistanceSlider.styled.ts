import styled, {css} from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
`

const trackH = "0.4em";
const thumbD = "1.5em";
const filllC = "#ccced0";

const track = css`
  box-sizing: border-box;
  border: none;
  height: 4px;
  background: ${props=>props.theme.bgLight};
  border-radius: 8px;
`;

const trackFill = css`
  ${track};
  height: 6px;
  background-color: transparent;
  background-image: linear-gradient(${props=>props.theme.bgLight}, ${props=>props.theme.bgLight}),
    linear-gradient(${props=>props.theme.bgLight}, ${props=>props.theme.bgLight});
  background-size: var(--sx) 6px, calc(100% - var(--sx)) 4px;
  background-position: left center, right center;
  background-repeat: no-repeat;
`;

const fill = css`
  height: ${trackH};
  background: ${filllC};
  border-radius: 4px;
`;

const thumb = css`
  box-sizing: border-box;
  border: none;
  width: ${thumbD};
  height: ${thumbD};
  border-radius: 50%;
  background: ${props=>props.theme.textSubtle};
  box-shadow: 0px 0px 5px rgba(66, 97, 255, 0.5);
`;

export const Input = styled.input`
  opacity: 0.7;
  transition: opacity 200ms;
  :hover,:active {
    opacity: 1;
  }
  direction: rtl;
  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;

  }

  &:focus::-webkit-slider-thumb {
    outline: -webkit-focus-ring-color auto 0px;


  }
  &:active::-webkit-slider-thumb {
       outline: -webkit-focus-ring-color auto 0px;
       background-color: ${props=>props.theme.text};
       transition: background-color 200ms;

     }

  &:focus::-moz-range-thumb {
    outline: -webkit-focus-ring-color auto 0;


  }

  &:focus::-ms-thumb {
    outline: -webkit-focus-ring-color auto 0;
    

  }
  
  --sx: calc(0.5 * ${thumbD} + var(--ratio) * (100% - ${thumbD}));

  margin: 0;
  padding: 0;
  height: ${thumbD};
  background: transparent;
  font: 1em/1 arial, sans-serif;

  &::-webkit-slider-runnable-track {
    ${trackFill};
  }

  &::-moz-range-track {
    ${track};
  }

  &::-ms-track {
    ${track};
  }

  &::-moz-range-progress {
    ${fill};
  }

  &::-ms-fill-lower {
    ${fill};
  }

  &::-webkit-slider-thumb {
    margin-top: calc(0.5 * (${trackH} - ${thumbD}));
    ${thumb};
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &::-ms-thumb {
    margin-top: 0;
    ${thumb};
  }

  &::-ms-tooltip {
    display: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }
`;
