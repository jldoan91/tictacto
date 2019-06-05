import React from 'react';
import styles from './board.css';

const Board = class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            move: 0,
            playerPiece: '',
            computerPiece: '',
            boxes: {
                topLeft: 'O',
                topMid: '',
                topRight: '',
                midLeft: '',
                center: '',
                midRight: '',
                botLeft: '',
                botMid: '',
                botRight: ''
            },
            computerTurn: false,
            gameActive: true
        };
    }

    onClick = (box) => {
        if (!this.state.boxes[box]) {
            this.setState(prevState => ({
                boxes: {
                    ...prevState.boxes,
                    [box]: this.state.playerPiece
                },
                computerTurn: true
            }))
        }
    }

    selectPiece = (piece) => {
        (piece === 'X') ? this.setState({ playerPiece: 'X', computerPiece: 'O' }) : this.setState({ playerPiece: 'O', computerPiece: 'X' })
    }

    render() {
        if (!this.state.playerPiece && !this.state.computerPiece) {
            return (
                <div className={styles.container}>
                    <div className={styles.header}>
                        Select a Piece
                    </div>
                    <div>
                        <span onClick={() => this.selectPiece('X')} className={styles.piece}>X</span>
                        <span onClick={() => this.selectPiece('O')} className={styles.piece}>O</span>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={styles.container}>
                    <div className={styles.header}>
                        Tic-Tac-Toe
                    </div>
                    <div className={styles.board}>
                        <div className={styles.top}>
                            <div disabled={this.state.computerTurn} onClick={() => this.onClick('topLeft')} className={styles.topLeft}>{this.state.boxes.topLeft}</div>
                            <div onClick={() => this.onClick('topMid')} className={styles.topMid}>{this.state.boxes.topMid}</div>
                            <div onClick={() => this.onClick('topRight')} className={styles.topRight}>{this.state.boxes.topRight}</div>
                        </div>
                        < div className={styles.mid}>
                            <div onClick={() => this.onClick('midLeft')} className={styles.midLeft}>{this.state.boxes.midLeft}</div>
                            <div onClick={() => this.onClick('center')} className={styles.center}>{this.state.boxes.center}</div>
                            <div onClick={() => this.onClick('midRight')} className={styles.midRight}>{this.state.boxes.midRight}</div>
                        </div>
                        <div className={styles.bot}>
                            <div onClick={() => this.onClick('botLeft')} className={styles.botLeft}> {this.state.boxes.botLeft}</div>
                            <div onClick={() => this.onClick('botMid')} className={styles.botMid}>{this.state.boxes.botMid}</div>
                            <div onClick={() => this.onClick('botRight')} className={styles.botRight}>{this.state.boxes.botRight}</div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Board;