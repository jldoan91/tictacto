import React from 'react';
import styles from './board.css';

const Board = class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerPiece: '',
            computerPiece: '',
            boxes: {
                topLeft: '',
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
            gameActive: true,
            winner: '',
            winPieces: []
        };
    }

    playAgain = () => {
        this.setState({
            move: 1,
            playerPiece: '',
            computerPiece: '',
            boxes: {
                topLeft: '',
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
            gameActive: true,
            winner: '',
            winPieces: []
        })
    }

    componentDidUpdate() {
        console.log(this.state.move);
        const board = Object.values(this.state.boxes);
        const keys = Object.keys(this.state.boxes);
        const winCond = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        let xInd = [];
        let oInd = [];

        if (!board.includes('') && !this.state.winner) {
            this.setState({ gameActive: false, winner: 'Tie Game!' })
        }

        board.forEach((val, ind) => {
            val === 'X' ? xInd.push(ind) : val === 'O' ? oInd.push(ind) : val;
        })

        winCond.forEach(val => {
            let xCheck = xInd.filter(ind => {
                return val.includes(ind);
            })
            let oCheck = oInd.filter(ind => {
                return val.includes(ind);
            })

            let winPieces = [];

            if (xCheck.length === 3 && this.state.gameActive) {
                console.log('game over!')

                xCheck.forEach(val => {
                    winPieces.push(keys[val]);
                })
                this.setState({ gameActive: false, winPieces: winPieces })
                this.state.playerPiece === 'X' ? this.setState({ winner: 'You Won!' }) : this.setState({ winner: 'The Computer Won.' });
            } else if (oCheck.length === 3 && this.state.gameActive) {
                console.log('game over!')

                oCheck.forEach(val => {
                    winPieces.push(keys[val]);
                })
                this.setState({ gameActive: false, winPieces: winPieces })
                this.state.playerPiece === 'O' ? this.setState({ winner: 'You Won!' }) : this.setState({ winner: 'The Computer Won.' })
            }
        })

    }

    onClick = (box) => {
        // && !this.state.computerTurn
        if (!this.state.boxes[box] && this.state.gameActive) {
            this.setState(prevState => ({
                boxes: {
                    ...prevState.boxes,
                    [box]: this.state.playerPiece
                },
                computerTurn: true,
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
                            <div onClick={() => this.onClick('topLeft')} className={this.state.winPieces.includes('topLeft') ? `${styles.topLeft} ${styles.green}` : styles.topLeft}>{this.state.boxes.topLeft}</div>
                            <div onClick={() => this.onClick('topMid')} className={this.state.winPieces.includes('topMid') ? `${styles.topMid} ${styles.green}` : styles.topMid}>{this.state.boxes.topMid}</div>
                            <div onClick={() => this.onClick('topRight')} className={this.state.winPieces.includes('topRight') ? `${styles.topRight} ${styles.green}` : styles.topRight}>{this.state.boxes.topRight}</div>
                        </div>
                        < div className={styles.mid}>
                            <div onClick={() => this.onClick('midLeft')} className={this.state.winPieces.includes('midLeft') ? `${styles.midLeft} ${styles.green}` : styles.midLeft}>{this.state.boxes.midLeft}</div>
                            <div onClick={() => this.onClick('center')} className={this.state.winPieces.includes('center') ? `${styles.center} ${styles.green}` : styles.center}>{this.state.boxes.center}</div>
                            <div onClick={() => this.onClick('midRight')} className={this.state.winPieces.includes('midRight') ? `${styles.midRight} ${styles.green}` : styles.midRight}>{this.state.boxes.midRight}</div>
                        </div>
                        <div className={styles.bot}>
                            <div onClick={() => this.onClick('botLeft')} className={this.state.winPieces.includes('botLeft') ? `${styles.botLeft} ${styles.green}` : styles.botLeft}> {this.state.boxes.botLeft}</div>
                            <div onClick={() => this.onClick('botMid')} className={this.state.winPieces.includes('botMid') ? `${styles.botMid} ${styles.green}` : styles.botMid}>{this.state.boxes.botMid}</div>
                            <div onClick={() => this.onClick('botRight')} className={this.state.winPieces.includes('botRight') ? `${styles.botRight} ${styles.green}` : styles.botRight}> {this.state.boxes.botRight}</div >
                        </div >
                    </div >
                    <div className={styles.winner}>
                        <p>{this.state.winner}</p>
                    </div>
                    <div>
                        {!this.state.gameActive ? <button type="button" onClick={this.playAgain} className={styles.btn}>Play Again!</button> : this.state.gameActive}
                    </div>
                </div >
            );
        }
    }
}

export default Board;