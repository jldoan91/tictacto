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
            winMsg: '',
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
            winMsg: '',
            winPieces: []
        })
    }

    checkWin = (board, player) => {
        let winner;
        let winPieces = [];
        const keys = Object.keys(this.state.boxes);
        const winCond = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let playerArr = [];

        board.forEach((val, ind) => {
            if (val === player) {
                playerArr.push(ind);
            }
        });

        winCond.forEach(val => {
            let playerCheck = playerArr.filter(ind => {
                return val.includes(ind);
            });
            if (playerCheck.length === 3) {
                playerCheck.forEach(val => {
                    winPieces.push(keys[val]);
                });
                winner = { winner: player, pieces: winPieces };
            }
        });
        return winner;
    };

    // miniMax = (board, player) => {
    //     //build array of available positions from board
    //     let avPos = [];
    //     board.forEach((val, ind) => {
    //         if (!val) {
    //             avPos.push(ind);
    //         }
    //     })

    //     if (this.checkWin(board, player) === this.state.player) {
    //         return { score: 10 }
    //     } else if (this.checkWin(board, player) === this.state.computer) {
    //         return { score: -10 }
    //     } else if (avPos.length === 0) {
    //         return { score: 0 }
    //     }

    //     let moves = [];
    //     for (let i = 0; i < avPos.length; i++) {
    //         let move = {};
    //         move.index = avPos[i]
    //         board[avPos[i]] = player;

    //         if (player == this.state.computer) {
    //             let result = this.miniMax(board, this.state.computer)
    //             move.score = result.score;
    //         } else {
    //             let result = this.miniMax(board, this.state.player)
    //             move.score = result.score;
    //         }
    //         avPos[i] = move.index;

    //         moves.push(move);
    //     }

    //     // return moves;

    //     let bestMove;
    //     if (player === this.state.computer) {
    //         let bestScore = -100;
    //         for (let i = 0; i < moves.length; i++) {
    //             if (moves[i].score > bestScore) {
    //                 bestScore = moves[i].score;
    //                 bestMove = i;
    //             }
    //         }
    //     } else {
    //         let bestScore = 100;
    //         for (let i = 0; i < moves.length; i++) {
    //             if (moves[i].score < bestScore) {
    //                 bestScore = moves[i].score;
    //                 bestMove = i;
    //             }
    //         }
    //     }
    //     return moves[bestMove];
    // }

    onClick = (box) => {
        // && !this.state.computerTurn
        if (!this.state.boxes[box] && this.state.gameActive) {
            this.setState(prevState => ({
                boxes: {
                    ...prevState.boxes,
                    [box]: this.state.player
                },
                computerTurn: true
            }))
        }
    }

    // aiTurn = (board) => {
    //     //build array of available positions
    //     let keys = Object.keys(this.state.boxes);
    //     let avPos = [];
    //     board.forEach((val, ind) => {
    //         if (!val) {
    //             avPos.push(ind);
    //         }
    //     })

    //     //if center spot is open place computer piece there
    //     if (avPos.includes(4)) {
    //         this.setState(prevState => ({
    //             boxes: {
    //                 ...prevState.boxes,
    //                 [keys[4]]: this.state.computer
    //             },
    //             computerTurn: false
    //         }))
    //         //else place in the top left
    //     } else if (avPos.includes(0)) {
    //         this.setState(prevState => ({
    //             boxes: {
    //                 ...prevState.boxes,
    //                 [keys[0]]: this.state.computer
    //             },
    //             computerTurn: false
    //         }))
    //         //else call the minimax algorithm to pick a spot
    //     } else if (avPos.length <= 6) {
    //         let move = this.miniMax(board, this.state.computer);
    //         this.setState(prevState => ({
    //             boxes: {
    //                 ...prevState.boxes,
    //                 [keys[move.index]]: this.state.computer
    //             },
    //             computerTurn: false
    //         }))
    //     }


    // }

    selectPiece = piece => {
        (piece === 'X') ? this.setState({ player: 'X', computer: 'O' }) : this.setState({ player: 'O', computer: 'X' })
    }

    componentDidUpdate() {
        const board = Object.values(this.state.boxes);

        const playerCheck = this.checkWin(board, this.state.player);
        const computerCheck = this.checkWin(board, this.state.computer);

        //if either check has a winner set state for winning message and pieces
        if (playerCheck && this.state.gameActive) {
            this.setState({ gameActive: false, winMsg: `${playerCheck.winner} wins!`, winPieces: playerCheck.pieces })
        } else if (computerCheck && this.state.gameActive) {
            this.setState({ gameActive: false, winMsg: `${computerCheck.winner} wins!`, winPieces: computerCheck.pieces })
        }

        // if (this.state.computerTurn && this.state.gameActive) {
        //     this.aiTurn(board)
        // }
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
        } else {
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
                        <p>{this.state.winMsg}</p>
                    </div>
                    <div>
                        {!this.state.gameActive ? <button type="button" onClick={() => this.playAgain()} className={styles.btn}>Play Again!</button> : this.state.gameActive}
                    </div>
                </div >
            );
        }
    }
}

export default Board;