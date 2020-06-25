import React, { Component } from 'react'
import SortItem from './sort-item.component';

export class InsertSort extends Component {
  constructor() {
    super();
    this.state = {
      arr: [],//: [9, 8, 7, 6, 5, 4, 3, 2, 1],
      currentIndex: 0,
      iIndex: 1
    }
  }

  componentWillReceiveProps(props) {
    const { numbers, isRun } = props;
    this.setState({ arr: [...numbers], isRun }, () => {
      if (isRun) {
        this.sort();
      }
    });
  }

  sort = () => {
    let time = 0;
    const { arr } = this.state;
    for (let i = 1; i < arr.length; i++) {
      let currentValue = arr[i];
      let j = i - 1;
      while (j > -1 && arr[j] > currentValue) {
        arr[j + 1] = arr[j];
        let x = [...arr];
        x[j] = 0;
        setTimeout(() => {
          this.setState({ arr: x });
        }, time += this.props.timeSpan);
        j--;
      }
      arr[j + 1] = currentValue;
      let y = [...arr];
      setTimeout(() => {
        this.setState({ arr: y });
      }, time += this.props.timeSpan);
    }
  }
  render() {
    return (
      <SortItem name='Insert sort'>
        <div style={{ display: 'flex' }}>
          {
            this.state.arr.map((val, index) => {
              return (
                <span className="element"
                  style={{
                    height: val * 2,
                    background: 'red',
                    marginRight: 10,
                  }} key={index}
                  title={val} />
              )
            })
          }
        </div>
      </SortItem>
    )
  }
}

export default InsertSort
