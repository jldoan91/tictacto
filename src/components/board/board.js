import React from 'react';
import styles from './board.css';

const Board = class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            move: 0,
            selectedPiece: '',
            turn: ''
        };
    }

    onClick = (box) => {
        this.setState({})
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Tic-Tac-Toe</h1>
                </div>
                <div className={styles.board}>
                    <div className={styles.top}>
                        <div onClick={() => this.onClick('topLeft')} className={styles.topLeft}>{this.state.topLeft}</div>
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
                {/* <button className={styles.btn} type="button">Lock In</button> */}
            </div>
        );
    }
}

export default Board;