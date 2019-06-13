import React from 'react';
import styles from './board.css';

const Board = class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            computer: '',
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
            winningMsg: '',
            winPieces: []
        };
    }

    playAgain = () => {
        this.setState({
            player: '',
            computer: '',
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

    checkWin = (xArr, oArr, keys) => {
        const winCond = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        //loop over win conditions to check if anyone has 3 in a row and store winning pieces in state
        winCond.forEach(val => {
            let xCheck = xArr.filter(ind => {
                return val.includes(ind);
            })
            let oCheck = oArr.filter(ind => {
                return val.includes(ind);
            })

            let winPieces = [];

            //set state if x or o player has 3 in a row and fill winPieces array with winning squares
            if (xCheck.length === 3 && this.state.gameActive) {
                console.log('game over!')
                xCheck.forEach(val => {
                    winPieces.push(keys[val]);
                })
                this.setState({ gameActive: false, winPieces: winPieces })
                this.state.player === 'X' ? this.setState({ winningMsg: 'You Won!' }) : this.setState({ winningMsg: 'The Computer Won.' });
            } else if (oCheck.length === 3 && this.state.gameActive) {
                console.log('game over!')
                oCheck.forEach(val => {
                    winPieces.push(keys[val]);
                })
                this.setState({ gameActive: false, winPieces: winPieces })
                this.state.player === 'O' ? this.setState({ winningMsg: 'You Won!' }) : this.setState({ winningMsg: 'The Computer Won.' })
            }
        })
    }

    componentDidUpdate() {
        //create array of piece placements and piece keys
        const keys = Object.keys(this.state.boxes);
        const board = Object.values(this.state.boxes);
        let xInd = [];
        let oInd = [];

        //tie game if board is full and no winner declared
        if (!board.includes('') && !this.state.winningMsg) {
            this.setState({ gameActive: false, winningMsg: 'Tie Game!' })
        }

        //fill x and o arrays with placement of pieces
        board.forEach((val, ind) => {
            val === 'X' ? xInd.push(ind) : val === 'O' ? oInd.push(ind) : val;
        })

        this.checkWin(xInd, oInd, keys);
    }

    onClick = (box) => {
        //update state based on which box is clicked and which piece player selected
        // && !this.state.computerTurn
        if (!this.state.boxes[box] && this.state.gameActive) {
            this.setState(prevState => ({
                boxes: {
                    ...prevState.boxes,
                    [box]: this.state.player
                },
                computerTurn: true,
            }))
        }
    }

    selectPiece = (piece) => {
        (piece === 'X') ? this.setState({ player: 'X', computer: 'O' }) : this.setState({ player: 'O', computer: 'X' })
    }

    render() {
        if (!this.state.player && !this.state.computer) {
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
                        <p>{this.state.winningMsg}</p>
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