/**
 * MonopolyWrapper
 * 
 * Wrapper component that provides default props to MonopolyApp
 * for integration with the 802Collections app registry
 */

import React from 'react';
import MonopolyApp from './MonopolyApp';

const MonopolyWrapper = (): React.JSX.Element => {
  return (
    <MonopolyApp
      theme={{
        primaryColor: '#44D62C',
        backgroundColor: '#000000',
      }}
      rules={{
        startingBalance: 1500,
        salaryAmount: 200,
        auctionEnabled: true,
        tradingEnabled: true,
        powersEnabled: true,
      }}
    />
  );
};

export default MonopolyWrapper;
