import { getUnvisitedNeighbors, getNodesInShortestPathOrder } from './graph'


const createNode = (node) => {
    return {
        ...node,
        previousNode: null
    }
}

const coverGridFBS = (grid) => {
    const newGrid = [];
    for (let row of grid) {
        const currentRow = [];
        for (let node of row) {
            const newNode = createNode(node);
            currentRow.push(newNode);
        }
        newGrid.push(currentRow);
    }
    return newGrid;
}

export function breadthFirstSearch(grid, startNodePosition, finishNodePosition) {
    const newGrid = coverGridFBS(grid);
    const visitedNodesInOrder = [];
    const queueVisitedNodes = [];
    const startNode = newGrid[startNodePosition.row][startNodePosition.col];
    const finishNode = newGrid[finishNodePosition.row][finishNodePosition.col];
    visitedNodesInOrder.push(startNode);
    queueVisitedNodes.push(startNode);
    while (!!queueVisitedNodes.length) {
        const currentNode = queueVisitedNodes.shift();
        currentNode.isVisited = true;
        const nodeNeighbors = getUnvisitedNeighbors(newGrid, currentNode);
        for (let neighbor of nodeNeighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;

            visitedNodesInOrder.push(neighbor);
            queueVisitedNodes.push(neighbor);

            if (neighbor === finishNode) {
                const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
                return { visitedNodesInOrder, nodesInShortestPathOrder }
            }
        }
    }
    return { visitedNodesInOrder, nodesInShortestPathOrder: [] }
}