import React from 'react';
import styles from './board.css';

const Board = class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClick = (event) => {
        !event.target.innerHTML ? event.target.innerHTML = 'X' : event.target.innerHTML = '';
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Tic-Tac-Toe</h1>
                </div>
                <div className={styles.board}>
                    <div className={styles.top}>
                        <div onClick={this.onClick} className={styles.topLeft}></div>
                        <div onClick={this.onClick} className={styles.topMid}></div>
                        <div onClick={this.onClick} className={styles.topRight}></div>
                    </div>
                    <div className={styles.mid}>
                        <div onClick={this.onClick} className={styles.midLeft}></div>
                        <div onClick={this.onClick} className={styles.center}></div>
                        <div onClick={this.onClick} className={styles.midRight}></div>
                    </div>
                    <div className={styles.bot}>
                        <div onClick={this.onClick} className={styles.botLeft}></div>
                        <div onClick={this.onClick} className={styles.botMid}></div>
                        <div onClick={this.onClick} className={styles.botRight}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;