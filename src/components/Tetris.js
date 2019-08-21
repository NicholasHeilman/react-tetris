import React from 'react';
import Stage from "./Stage";
import Display from './Display';
import StartBtn from './StartBtn';
import { createStage } from '../gameHelpers';
import { StyledWrapper, StyledTetris } from './styles/StyledTetris';

const Tetris = () => {
    // console.log(createStage());
    return(
        <StyledWrapper>
            <StyledTetris>
            <Stage stage={createStage()} />
            <aside>
                <div>
                    <Display text="Score" />
                    <Display text="Row" />
                    <Display text="Level" />
                </div>
                <StartBtn />
            </aside>
            </StyledTetris>
        </StyledWrapper>
    )
}

export default Tetris;