import React from 'react';
import styles from './board.css';

const Board = class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Tic-Tac-Toe</h1>
                </div>
                <div className={styles.board}>
                    <div className={styles.top}>
                        <div className={styles.topLeft}></div>
                        <div className={styles.topMid}></div>
                        <div className={styles.topRight}></div>
                    </div>
                    <div className={styles.mid}>
                        <div className={styles.midLeft}></div>
                        <div className={styles.center}></div>
                        <div className={styles.midRight}></div>
                    </div>
                    <div className={styles.bot}>
                        <div className={styles.botLeft}></div>
                        <div className={styles.botMid}></div>
                        <div className={styles.botRight}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;