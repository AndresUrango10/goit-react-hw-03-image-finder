import React, { Component } from 'react';
import { ContainerLoader } from './Loader.styled';
import { Vortex } from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
      <ContainerLoader>
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['blue', 'blue', 'blue', 'blue', 'blue', 'blue']}
        />
      </ContainerLoader>
    );
  }
}

export default Loader;
