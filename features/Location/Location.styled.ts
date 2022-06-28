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
  margin-bottom: 16px;
  &:hover{
    background-color: rgba(0,0,0,0.15);
    
  }
`

export const Text = styled.div`
  margin-top: 4px;
  font-size: 16px;
  color: ${props => props.theme.text};
  text-transform: lowercase;
`

export const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
`