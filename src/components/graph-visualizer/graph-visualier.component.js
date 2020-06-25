import React, { Component } from 'react'
import Node from './node/node.component'
import { getInitialGrid, getGridWallToggled, getNodesInShortestPathOrder, getGridStartToggled, getGridFinishToggled } from '../../graph-algorithms/graph'
import { dijkstra } from '../../graph-algorithms/dijkstra'
import { breadthFirstSearch } from '../../graph-algorithms/breadth-first-search'

import './graph-visualier.styles.css'
import { depthFirstSearch } from '../../graph-algorithms/depth-first-search'
class GraphVisualier extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            startNodePosition: { row: 7, col: 7 },
            finishNodePosition: { row: 4, col: 14 },
            startNodeSelected: false,
            finishNodeSelected: false,
            realTimeAble: false,
            graphAlgorithmId: null,
        };
        this.idRealTimeOut = null;
        this.nodesVisitedDoc = [];
        this.nodesPathDoc = [];
    }

    componentDidMount() {
        const { startNodePosition, finishNodePosition } = this.state;
        const grid = getInitialGrid(20, 30, startNodePosition, finishNodePosition);
        this.setState({ grid });
    }

    handleMouseDown = (row, col) => {
        const { startNodePosition, finishNodePosition, startNodeSelected, finishNodeSelected } = this.state;

        if (startNodeSelected || finishNodeSelected) {
            this.setState({ startNodeSelected: false, finishNodeSelected: false });
            return;
        }
        if (startNodePosition.row === row && startNodePosition.col === col) {
            this.setState({ startNodeSelected: true });
            return;
        }
        if (finishNodePosition.row === row && finishNodePosition.col === col) {
            this.setState({ finishNodeSelected: true });
            return;
        }

        const newGrid = getGridWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter = (row, col) => {
        const { grid,
            startNodePosition,
            finishNodePosition,
            startNodeSelected,
            finishNodeSelected,
            realTimeAble } = this.state;
        const newGrid = this.getGridForReset(grid);

        if (startNodeSelected) {
            newGrid[startNodePosition.row][startNodePosition.col].isStart = false;
            newGrid[row][col].isStart = true;
            this.setState({ grid: newGrid, startNodePosition: { row, col } });
            if (realTimeAble) {
                clearImmediate(this.idRealTimeOut);
                this.idRealTimeOut = setImmediate(() => {
                    this.realTimeGraphVisualizer();
                });
            }
            return;
        }

        if (finishNodeSelected) {
            if (finishNodePosition.row === row && finishNodePosition.col === col) return;
            newGrid[finishNodePosition.row][finishNodePosition.col].isFinish = false;
            newGrid[row][col].isFinish = true;
            this.setState({ grid: newGrid, finishNodePosition: { row, col } });
            if (realTimeAble) {
                clearImmediate(this.idRealTimeOut);
                this.idRealTimeOut = setImmediate(() => {
                    this.realTimeGraphVisualizer();
                });
            }
            return;
        }

        if (!this.state.mouseIsPressed) return;
        newGrid[row][col].isWall = !newGrid[row][col].isWall
        this.setState({ grid: newGrid });
    }


    handleMouseUp = () => {
        this.setState({ mouseIsPressed: false });
    }

    animateNodesVisited(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 1; i <= visitedNodesInOrder.length; i++) {

            if (i === visitedNodesInOrder.length - 1) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 20 * i + 1000);


                return;
            }

            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const x = document.getElementById(`node-${node.row}-${node.col}`)
                x.className = 'node animation node--visited';
            }, 20 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
            if (i == nodesInShortestPathOrder.length - 1) {
                setTimeout(() => {
                    this.setState({ realTimeAble: true });
                    let adoc = document.querySelectorAll('.animation');
                    adoc.forEach(a => a.classList.remove('animation'));
                }, 50 * i + 1000);
                return;
            }
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                const y = document.getElementById(`node-${node.row}-${node.col}`);
                y.className = 'node animation node-shortest-path';

            }, 50 * i);
        }
    }

    realTimeGraphVisualizer() {
        const { startNodePosition, finishNodePosition, grid } = this.state;
        const newGrid = this.getGridForReset(grid);
        const currentGraphAlgorithm = this.getCurrentGraphAlgorithm();
        const { visitedNodesInOrder, nodesInShortestPathOrder } = currentGraphAlgorithm(newGrid,
            startNodePosition,
            finishNodePosition);
        console.log(visitedNodesInOrder);
        for (let { row, col } of visitedNodesInOrder) {
            newGrid[row][col].isVisited = true;
        }

        for (let { row, col } of nodesInShortestPathOrder) {
            newGrid[row][col].isVisited = true;
            newGrid[row][col].isShortestPath = true;
        }

        this.setState({ grid: newGrid });
    }

    visualizeDijkstra() {
        const { startNodePosition, finishNodePosition, grid } = this.state;
        const newGrid = this.getGridForReset(grid);

        const { visitedNodesInOrder, nodesInShortestPathOrder } = dijkstra(newGrid,
            startNodePosition,
            finishNodePosition);
        console.log(visitedNodesInOrder);
        for (let { row, col } of visitedNodesInOrder) {
            newGrid[row][col].isVisited = true;
        }

        for (let { row, col } of nodesInShortestPathOrder) {
            newGrid[row][col].isVisited = true;
            newGrid[row][col].isShortestPath = true;
        }

        this.setState({ grid: newGrid, graphAlgorithmId: 'dijkstra', realTimeAble: false }, () => {
            this.animateNodesVisited(visitedNodesInOrder, nodesInShortestPathOrder);
        });

    }

    visualizeBFS() {
        const { startNodePosition, finishNodePosition, grid } = this.state;
        const newGrid = this.getGridForReset(grid);
        const { visitedNodesInOrder, nodesInShortestPathOrder } = breadthFirstSearch(newGrid,
            startNodePosition,
            finishNodePosition);
        console.log(visitedNodesInOrder);
        for (let { row, col } of visitedNodesInOrder) {
            newGrid[row][col].isVisited = true;
        }

        for (let { row, col } of nodesInShortestPathOrder) {
            newGrid[row][col].isVisited = true;
            newGrid[row][col].isShortestPath = true;
        }

        this.setState({ grid: newGrid, graphAlgorithmId: 'bfs', realTimeAble: false }, () => {
            this.animateNodesVisited(visitedNodesInOrder, nodesInShortestPathOrder);
        });
    }

    visualizeDFS() {
        const { startNodePosition, finishNodePosition, grid } = this.state;
        const newGrid = this.getGridForReset(grid);
        const { visitedNodesInOrder, nodesInShortestPathOrder } = depthFirstSearch(newGrid,
            startNodePosition,
            finishNodePosition);
        console.log(visitedNodesInOrder);
        for (let { row, col } of visitedNodesInOrder) {
            newGrid[row][col].isVisited = true;
        }

        for (let { row, col } of nodesInShortestPathOrder) {
            newGrid[row][col].isVisited = true;
            newGrid[row][col].isShortestPath = true;
        }

        this.setState({ grid: newGrid, graphAlgorithmId: 'dfs', realTimeAble: false }, () => {
            this.animateNodesVisited(visitedNodesInOrder, nodesInShortestPathOrder);
        });
    }

    getGridForReset(grid) {
        const newGrid = grid.map(row => row.map(node => {
            if (node.isVisited || node.isShortestPath) {
                return {
                    ...node,
                    isVisited: false,
                    isShortestPath: false
                };
            }
            return node;
        }));
        return newGrid;
    }

    getCurrentGraphAlgorithm = () => {
        switch (this.state.graphAlgorithmId) {
            case 'dijkstra':
                return (newGrid, startNode, finishNode) => dijkstra(newGrid, startNode, finishNode);
            case 'dfs':
                return (newGrid, startNode, finishNode) => depthFirstSearch(newGrid, startNode, finishNode);
            case 'bfs':
                return (newGrid, startNode, finishNode) => breadthFirstSearch(newGrid, startNode, finishNode);
        }
    }

    render() {
        const { grid, mouseIsPressed, visited, graphAlgorithmId, realTimeAble } = this.state;
        return (
            <div className="graph">
                <h2>graph algorithms</h2>
                <div className="graph__header">
                    <button className={graphAlgorithmId === 'dijkstra' ? 'active' : ''}
                        onClick={() => this.visualizeDijkstra()}>
                        Visualize Dijkstra's Algorithm
                    </button>
                    <button className={graphAlgorithmId === 'bfs' ? 'active' : ''}
                        onClick={() => this.visualizeBFS()}>
                        Visualize BFS Algorithm
                    </button>
                    <button className={graphAlgorithmId === 'dfs' ? 'active' : ''}
                        onClick={() => this.visualizeDFS()}>
                        Visualize DFS Algorithm
                    </button>
                </div>

                <div className={`grid ${realTimeAble ? 'real-time' : 'animation'}`}>
                    {grid.map((row, rowIdx) => {
                        return (
                            <div className="row" key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            node={node}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                        ></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default GraphVisualier
