import { getUnvisitedNeighbors, getNodesInShortestPathOrder } from './graph'

const createNode = (node) => {
    return {
        ...node,
        previousNode: null
    }
}

const coverGridDFS = (grid) => {
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

export function depthFirstSearch(grid, startNodePosition, finishNodePosition) {
    const newGrid = coverGridDFS(grid);
    const visitedNodesInOrder = [];
    const stacksVisitedNodes = [];
    const startNode = newGrid[startNodePosition.row][startNodePosition.col];
    const finishNode = newGrid[finishNodePosition.row][finishNodePosition.col];

    startNode.isVisited = true;
    visitedNodesInOrder.push(startNode);
    stacksVisitedNodes.push(startNode);

    while (!!stacksVisitedNodes.length) {
        const currentNode = stacksVisitedNodes[stacksVisitedNodes.length - 1];
        const nodeNeighbors = getUnvisitedNeighbors(newGrid, currentNode);

        if (!!nodeNeighbors.length) {
            let list = nodeNeighbors;
            list[0].isVisited = true;
            list[0].previousNode = currentNode;

            visitedNodesInOrder.push(list[0]);
            stacksVisitedNodes.push(list[0]);
            if (list[0] === finishNode) {
                break;
            }
        } else {
            stacksVisitedNodes.pop();
        }

    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    return { visitedNodesInOrder, nodesInShortestPathOrder }
}