import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NotefulError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>ERROR</h2>
          <p>Something went wrong...</p>
        </div>
      );
    }
    return this.props.children;
  }
}

NotefulError.propTypes = {
  children: PropTypes.array,
};
