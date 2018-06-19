import React, { Component } from 'react';

import { connect } from 'react-redux';
import { increment, decrement } from './actions';

class Counter extends Component {
  render() {
    return (
      <div>
        <span>Counter : {this.props.count}</span>
        <br></br>
        <button onClick= {() => this.props.decrementNb(1)}>-</button>
        <button onClick= {() => this.props.incrementNb(1)}>+</button>
      </div>
    );
  }
}

// Ici, on précise tout simplement ce que l'on veut dans nos props
// dans le premier cas, on va dire qu'on veut le compte actuel du state
// dans nos props, et qu'il s'appelera "count"
const mapStateToProps = state => ({
  count: state.counter || 0,
});

// Dans le deuxième cas, on précise quels dispatchs on veut dans nos props.
// ici, on veut rajouter les actions "increment" et "décrement" qu'on a
// explicité dans le fichier "./actions.js"
const mapDispatchToProps = dispatch => ({
  incrementNb: by => dispatch(increment(by)),
  decrementNb: by => dispatch(decrement(by)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Counter);
