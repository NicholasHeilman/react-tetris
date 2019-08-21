import React from 'react';
import { StyledStartBtn } from './styles/StyledStartBtn';

function startBtnClick (){
    console.log('StartBtn Click')
}

const StartBtn =({ callback }) => (
    <StyledStartBtn onClick={startBtnClick}>
        Start Game
    </StyledStartBtn>
)

export default StartBtn;