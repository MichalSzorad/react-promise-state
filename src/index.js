import React, { Component } from "react";
import T from "prop-types";

export class ReactPromiseState extends Component {
  static propTypes = {
    render: T.func.isRequired,
    run: T.func.isRequired
  };

  state = {
    done: false,
    pending: false,
    error: null,
    result: null
  };

  run = (...args) => {
    const { run } = this.props;

    this.setState(
      { pending: true, error: null, result: null, done: false },
      () => {
        run(...args)
          .then(result => this.setState({ done: true, pending: false, result }))
          .catch(error => this.setState({ done: true, pending: false, error }));
      }
    );
  };

  render() {
    const { render } = this.props;
    const { done, pending, error, result } = this.state;

    return render({ done, pending, error, result, run: this.run });
  }
}

export default ReactPromiseState;
