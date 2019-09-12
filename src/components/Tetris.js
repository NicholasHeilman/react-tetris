import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';

//Components
import Stage from "./Stage";
import Display from './Display';
import StartBtn from './StartBtn';

//Styled Components
import { StyledWrapper, StyledTetris } from './styles/StyledTetris';
import '../components/styles/Tetris.css';

//Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStats } from '../hooks/useGamesStats';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStats(rowsCleared);

    const movePlayer = dir => {
        if(!checkCollision(player, stage, { x: dir, y: 0 })){
        updatePlayerPos({ x: dir, y: 0 })
        }
    }

    const startGame = () => {
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        //increase level for evey 10 rows clearded
        if(rows > (level +1)* 10){
            setLevel(prev => prev + 1); 
        //increase drop speed for the level
            setDropTime(1000 / (level +1) + 200);
        }
        if(!checkCollision(player, stage, {x: 0, y: 1})){
            updatePlayerPos({ x: 0, y: 1, collided: false});
        } else {
            if(player.pos.y < 1){
                console.log('Game Over');
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true});
            }
        }
        
    const keyUp = ({ keyCode}) => {
        if (!gameOver) {
            if(keyCode === 40){
                setDropTime(1000 / (level +1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
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
            } else if(keyCode === 38){
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();    
    }, dropTime)

    return(
        <StyledWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
            <Stage stage={stage} />
            <aside>
                {gameOver ? (
                <div>
                    <Display text={`Score: ${score}`} />
                    <Display gameOver={gameOver} text="Game Over" />
                </div>
                ) : (
                <div>
                    <Display text={`Score: ${score}`} />
                    <Display text={`Row: ${rows}`} />
                    <Display text={`Level: ${level}`} />
                </div>
                )};
                <StartBtn callback={startGame}/>
                <h3 className="controls">Controls</h3>
                <h4 className="instructions"><img src="https://img.icons8.com/metro/26/000000/up--v2.png" alt=""/> - Rotate</h4>
                <h4 className="instructions"><img src="https://img.icons8.com/metro/26/000000/long-arrow-left.png" alt=""/> - Move Left</h4>
                <h4 className="instructions"><img src="https://img.icons8.com/metro/26/000000/long-arrow-right.png" alt=""/> - Move Right</h4>
                <h4 className="instructions"><img src="https://img.icons8.com/metro/26/000000/down--v2.png" alt=""/> - Drop</h4>
            </aside>
            </StyledTetris>
        </StyledWrapper>
    )
}

export default Tetris;