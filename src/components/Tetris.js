import React, { useState } from 'react';

//Components
import Stage from "./Stage";
import Display from './Display';
import StartBtn from './StartBtn';

//Styled Components
import { StyledWrapper, StyledTetris } from './styles/StyledTetris';

//Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player] = usePlayer();
    const [stage, setStage] = useStage(player);


    console.log('re-render');
    return(
        <StyledWrapper>
            <StyledTetris>
            <Stage stage={stage} />
            <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" />
                ) : (
                <div>
                    <Display text="Score" />
                    <Display text="Row" />
                    <Display text="Level" />
                </div>
                )};
                <StartBtn />
            </aside>
            </StyledTetris>
        </StyledWrapper>
    )
}

export default Tetris;