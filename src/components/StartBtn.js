import React from 'react';
import { StyledStartBtn } from './styles/StyledStartBtn';

const StartBtn =({ callback }) => (
    <StyledStartBtn onClick={callback}>
        Start Game
    </StyledStartBtn>
)

export default StartBtn;