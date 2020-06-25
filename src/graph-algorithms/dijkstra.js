import { getUnvisitedNeighbors, getNodesInShortestPathOrder } from './graph'

const createNode = (node) => {
    return {
        ...node,
        distance: Infinity,
        previousNode: null
    }
}

const coverGridForDijkstra = (grid) => {
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

export function dijkstra(grid, startNodePosition, finishNodePosition) {
    const newGrid = coverGridForDijkstra(grid);
    const visitedNodesInOrder = [];
    const newStartNode = newGrid[startNodePosition.row][startNodePosition.col];
    const newFinishNode = newGrid[finishNodePosition.row][finishNodePosition.col];

    newStartNode.distance = 0;
    const unvisited = getAllNodes(newGrid);

    while (!!unvisited.length) {
        sortNodesByDistance(unvisited);
        const currentNode = unvisited.shift();
        if (currentNode.isWall) continue;
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        if (currentNode === newFinishNode) break;
        updateUnvisitedNeighbors(newGrid, currentNode);
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(newFinishNode)
    return { visitedNodesInOrder, nodesInShortestPathOrder };
}

function updateUnvisitedNeighbors(grid, node) {
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, node);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function sortNodesByDistance(nodes) {
    nodes.sort((a, b) => a.distance - b.distance);
}

function getAllNodes(grid = []) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

