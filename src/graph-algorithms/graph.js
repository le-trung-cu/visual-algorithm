const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: false,
        isFinish: false,
        isVisited: false,
        isWall: false,
        isShortestPath: false
    }
}

export const getInitialGrid = (rows, cols, start = { row: 10, col: 10 }, finish = { row: 10, col: 30 }) => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }

    grid[start.row][start.col].isStart = true;
    grid[finish.row][finish.col].isFinish = true;

    return grid;
};

export const getGridWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;

    return newGrid;
};

export const getUnvisitedNeighbors = (grid = [], node) => {
    const neighbors = [];
    const dc = [-1, 1, 0, 0];
    const dr = [0, 0, -1, 1];
    const { col, row } = node;
    for (let i = 0; i < 4; i++) {
        let cc = col + dc[i];
        let rr = row + dr[i];
        if (rr < 0 || cc < 0) continue;
        if (rr >= grid.length || cc >= grid[0].length) continue;

        neighbors.push(grid[rr][cc]);
    }
    return neighbors.filter(neighbor => !(neighbor.isVisited || neighbor.isWall));
}

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
