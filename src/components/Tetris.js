import React, { useState } from 'react';
import { createStage } from '../gameHelpers';

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
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);


    console.log('re-render');

    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0 })
    }

    const startGame = () => {
        //reset game
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false});
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if(!gameOver){
            if(keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39){
                movePlayer(1);
            } else if (keyCode === 40){
                dropPlayer();
            }
        }
    }

    return(
        <StyledWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
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
                <StartBtn callback={startGame}/>
            </aside>
            </StyledTetris>
        </StyledWrapper>
    )
}

export default Tetris;