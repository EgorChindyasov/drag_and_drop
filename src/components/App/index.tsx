import React, {
    FC, 
    DragEvent, 
    useState
} from 'react'
import {BoardType} from './type'

import styles from './index.scss'

const App: FC = () => {
    const [boards, setBoards] = useState<BoardType[]>([
        {id: 1, title: 'ToDo', items: ['Go to the store', 'Work', 'Have lunch', 'Make a video']},
        {id: 2, title: 'Progress', items: ['Code rewiev']},
        {id: 3, title: 'Done', items: []}
    ])
    const [currentBoard, setCurrentBoard] = useState<BoardType>()
    const [currentItem, setCurrentItem] = useState<string>('')

    const onDragStart = (event: DragEvent<HTMLDivElement>, board: BoardType, item: string) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
        event.target.style.boxShadow = 'none'
    }

    const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.target.style.boxShadow = 'none'
    }

    const onDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()

        if (event.target.className == 'App-item') {
            event.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    const onDropCard = (event: DragEvent<HTMLDivElement>, board: BoardType, item: string) => {
        event.preventDefault()

        const currentIndex = currentBoard?.items.indexOf(currentItem)
        currentBoard?.items.splice(currentIndex as number, 1)

        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)

        if (currentBoard) {
            updateBoardsState(board, currentBoard)
        }

        event.target.style.boxShadow = 'none'
    }

    const onDropBoard = (event: DragEvent<HTMLDivElement>, board: BoardType) => {
        event.preventDefault()

        board.items.push(currentItem)

        const currentIndex = currentBoard?.items.indexOf(currentItem)
        currentBoard?.items.splice(currentIndex as number, 1)

        if (currentBoard) {
            updateBoardsState(board, currentBoard)
        }
    }

    const updateBoardsState = (board: BoardType, currentBoard: BoardType) => {
        const newBoards = boards.map(item => {
            if (item.id == board.id) {
                return board
            }

            if (item.id == currentBoard?.id) {
                return currentBoard
            }

            return item
        })

        setBoards(newBoards)
    }

    return <div className={styles.app}>
        {
            boards.map(board => 
                <div 
                    className={styles.board}
                    onDragOver={onDragOver}
                    onDrop={(event: DragEvent<HTMLDivElement>) => onDropBoard(event, board)}
                >
                    <div className={styles.boardTitle}>
                        {board.title}
                    </div>
                    {board.items.map(item => 
                        <div 
                            className={styles.item}
                            draggable
                            onDragStart={(event: DragEvent<HTMLDivElement>) => onDragStart(event, board, item)}
                            onDragEnd={onDragEnd}
                            onDragLeave={onDragLeave}
                            onDragOver={onDragOver}
                            onDrop={(event: DragEvent<HTMLDivElement>) => onDropCard(event, board, item)}
                        >
                            {item}
                        </div>    
                    )}
                </div>
            )
        }
    </div>
}

export default App