import React, { Component } from 'react'
import BubbleSort from './bubble-sort.component';
import InsertSort from './insert-sort.component';
// import SelectionSort from './selection-sort.component';
import { QuickSort } from './quick-sort.component';
import MergeSort from './merge-sort.component';

export class Sorts extends Component {
  constructor() {
    super();
    this.state = {
      numbersStr: '',//: [9, 8, 7, 6, 5, 4, 3, 2, 1],
      numbers: [],
      count: 15,
      timeSpan: 100,
      isRun: false
    }
  }

  componentDidMount() {
    this.createRandomArray();
  }

  handleChange = (e) => {
    let value = e.target.value;
    if (!isNaN(value)) {
      value = parseInt(value);
    }
    let state = {};
    state[e.target.name] = value;
    this.setState({ ...state, isRun: false });
  }

  createRandomArray = (e) => {

    let numbers = [];
    for (let i = 0; i < this.state.count; i++) {
      let x = Math.floor(Math.random() * 100 + 1);
      numbers.push(x);
    }
    this.setState({ numbersStr: numbers.join(', '), numbers, isRun: false });
  }

  handleCreateRandomArr = (e) => {
    e.preventDefault();
    this.createRandomArray();
  }

  handleArrayChange = (e) => {
    let numbersStr = e.target.value;
    let numbers = this.coverToNumber(numbersStr);
    this.setState({ numbersStr, numbers, isRun: false });
  }

  handleRun = (e) => {
    e.preventDefault();
    this.setState({ isRun: true });
  }

  coverToNumber(numbersStr) {
    return numbersStr.trim().split(',').
      filter(num => !isNaN(num.trim()) && num !== '')
      .map(num => parseInt(num));
  }

  render() {
    const { numbersStr, numbers, isRun, count, timeSpan } = this.state;
    return (
      <div className="sort">
        <h2>sorts algorithms</h2>
        <div className="sort__header">
          <form action="">

            <label>count:
               <input type="number" name="count"
                style={{
                  display: 'inline-block',
                  width: '56px'
                }}
                value={count}
                onChange={this.handleChange} />
            </label>
            <label htmlFor="">
              time span:
              <input type="number" name="timeSpan"
                style={{
                  display: ' inline-block',
                  width: '51px'
                }}
                value={timeSpan}
                onChange={this.handleChange} />
            </label>
            <button onClick={this.handleCreateRandomArr}>Random array</button>
            <button onClick={this.handleRun}>Run</button>
            <div className="txt-arr">
              <textarea name="" cols="30" rows="4"
                value={numbersStr}
                onChange={this.handleArrayChange} />

            </div>
          </form>
        </div>
        <div className="sort__list">
          <BubbleSort numbers={numbers} isRun={isRun} timeSpan={timeSpan} />
          <InsertSort numbers={numbers} isRun={isRun} timeSpan={timeSpan} />
          {/* <div className="sort__item">
            <SelectionSort numbers={numbers} isRun={isRun} timeSpan={timeSpan} />
          </div> */}
          <QuickSort numbers={numbers} isRun={isRun} timeSpan={timeSpan} />
          <MergeSort numbers={numbers} isRun={isRun} timeSpan={timeSpan} />
        </div>
      </div>
    )
  }
}

export default Sorts
