import React, { Component } from 'react'
import SortItem from './sort-item.component';

export class QuickSort extends Component {

  constructor() {
    super();
    this.state = {
      arr: [],
      left: 0,
      right: 0,
      isRun: false
    }
    this.time = 0;
  }

  componentWillReceiveProps(props) {
    this.time = 0;
    const { numbers, isRun } = props;
    this.setState({ arr: [...numbers], isRun, left: 0, right: numbers.length }, () => {
      if (isRun) {
        this.sort();
      }
    });
  }

  sort = () => {
    let arr = [...this.state.arr];
    this.subSort(arr, 0, arr.length);
  }

  subSort = (a = [], left, right) => {
    setTimeout(() => {
      this.setState({ left, right });
    }, this.time += this.props.timeSpan);

    if (left >= right) {
      return;
    }
    let i = left, j = right;
    while (i <= j) {
      do {
        i++;
      } while (a[i] <= a[left]);

      do {
        j--;
      } while (a[j] > a[left]);
      if (i < j) {
        [a[i], a[j]] = [a[j], a[i]];
        const x = [...a];
        setTimeout(() => {
          this.setState({ arr: x });
        }, this.time += this.props.timeSpan);
      }
    }

    [a[left], a[j]] = [a[j], a[left]];
    const x = [...a];
    setTimeout(() => {
      this.setState({ arr: x, left, right });
    }, this.time += this.props.timeSpan);
    this.subSort(a, left, j);
    this.subSort(a, j + 1, right);
  }

  render() {
    return (
      <SortItem name='Quick sort'>
        <div style={{ display: 'flex' }}>
          {
            this.state.arr.map((val, index) => {
              let isRand = index >= this.state.left && index <= this.state.right;
              return (
                <div className="element"
                  style={{
                    background: isRand ? 'red' : 'yellow',
                    height: 2 * val,
                    marginRight: 10
                  }} key={index} />
              )
            })
          }
        </div>
      </SortItem>
    )
  }
}

export default QuickSort
