import React, { Component } from 'react'
import SortItem from './sort-item.component';

export class BubbleSort extends Component {

  constructor(props) {
    super();
    this.state = {
      arr: [],//: [9, 8, 7, 6, 5, 4, 3, 2, 1],
      currentIndex: 0
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
    let arr = [...this.state.arr];
    let time = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      let flag = 0;
      for (let j = 0; j < arr.length - i - 1; j++) {

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          const x = [...arr];
          setTimeout(() => {
            this.setState({ arr: x, currentIndex: j })
          }, time += this.props.timeSpan);
          flag = 1;
        } else {
          setTimeout(() => {
            this.setState({});
          }, time += this.props.timeSpan);

        }

      }
      if (flag === 0) {
        break;
      }
    }
  }

  render() {
    return (
      <SortItem name='Bubble sort'>
        <div style={{ display: 'flex' }}>
          {
            this.state.arr.map((val, index) => {
              return (
                <span className="element"
                  style={{
                    height: val * 2,
                    background: index > this.state.arr.length - this.state.currentIndex - 1 ? 'yellow' : 'red',
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

export default BubbleSort
