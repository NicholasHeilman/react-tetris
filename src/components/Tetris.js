import React from 'react';
import Stage from "./Stage";
import Display from './Display';
import StartBtn from './StartBtn';

const Tetris = () => {

    return(
        <div>
            <Stage />
            <aside>
                <div>
                    <Display text="Score" />
                    <Display text="Row" />
                    <Display text="Level" />
                </div>
                <StartBtn />
            </aside>
        </div>
    )
}

export default Tetris;