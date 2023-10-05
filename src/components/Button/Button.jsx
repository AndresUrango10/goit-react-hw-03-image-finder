import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonLoad, ContainerDiv } from './Button.styled';

class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <ContainerDiv>
        <ButtonLoad onClick={onClick}>Load more</ButtonLoad>
      </ContainerDiv>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
