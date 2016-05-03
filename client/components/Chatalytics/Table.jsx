import React, { Component } from 'react';

export default class TableComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(">>>");
    console.log(this.props.data);
    if (this.props.data === null || this.props.columns === null) return <div></div>
    return (
      <table>
        <thead>
          <tr>
            {this.props.columns.map((col, i) => { 
              return <th key={col}>{this.props.aliases[i]}</th>})
            }
          </tr>
          {this.props.data.map((data, i) => { 
            return <tr key={i}>
              {this.props.columns.map((col, j) => {
                return <td key={j}>{data[col]}</td>
              })}
            </tr> 
          })}
        </thead>
        <tbody>
          <tr>
          
          </tr>
        </tbody>
      </table>
    );
  }

}