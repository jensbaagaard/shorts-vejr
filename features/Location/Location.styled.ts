import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  cursor: pointer;
  user-select: none;
  border-radius: 16px;
  width: fit-content;
  &:hover{
    background-color: rgba(0,0,0,0.15);
    
  }
`

export const Text = styled.div`
  margin-top: 4px;
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.textSubtle};
`

export const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
`