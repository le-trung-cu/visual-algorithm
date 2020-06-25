import React, { Component } from 'react'
import SortItem from './sort-item.component';

class MergeSort extends Component {

  constructor() {
    super();
    this.state = {
      arr: [],
      left: 0,
      right: 0
    }
    this.time = 0;
  }

  componentWillReceiveProps(props) {
    this.time = 0;
    const { numbers, isRun } = props;
    this.setState({ arr: [...numbers], isRun, left: 0, right: numbers.length - 1 }, () => {
      if (isRun) {
        this.sort();
      }
    });
  }

  sort() {
    const { arr } = this.state;
    this.subSort(arr, 0, arr.length - 1);
  }

  subSort = (arr = [], l, h) => {
    let mid;
    if (l < h) {
      mid = Math.floor((l + h) / 2);
      this.subSort(arr, l, mid);
      this.subSort(arr, mid + 1, h);

      this.merge(arr, l, mid, h);
    }

  }

  merge(arr = [], l, mid, h) {
    let arr2 = [];
    let i = l, j = mid + 1;
    while (i <= mid && j <= h) {
      if (arr[i] < arr[j]) {
        arr2.push(arr[i++]);
      } else {
        arr2.push(arr[j++])
      }
    }
    while (i <= mid) {
      arr2.push(arr[i++]);
    }

    while (j <= h) {
      arr2.push(arr[j++]);
    }
    for (let k = 0; k < arr2.length; k++) {
      arr[l + k] = arr2[k];
      const x = [...arr];
      setTimeout(() => {
        this.setState({ arr: x, left: l, right: h });
      }, this.time += this.props.timeSpan);
    }
  }

  render() {
    return (
      <SortItem name='Merge sort'>
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

export default MergeSort
