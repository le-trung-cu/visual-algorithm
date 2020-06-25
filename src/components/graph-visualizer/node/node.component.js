import React from 'react'
import './node.styles.css'

const Node = ({ node,
    onMouseDown, onMouseEnter, onMouseUp }) => {
    const { row, col, isFinish, isStart, isWall, isVisited, isShortestPath } = node;

    const classes = isFinish ? 'node--finish'
        : isStart ? 'node--start'
            : isWall ? 'node--wall'
                : isShortestPath ? 'node-shortest-path'
                    : isVisited ? 'node--visited' : '';
    return (
        <div id={`node-${row}-${col}`}
            className={`node ${classes}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()} />
    )
}

export default Node;