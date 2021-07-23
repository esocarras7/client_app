import React from 'react';
import GatewaysDashboard from './components/GatewaysDashboard'


function App() {

  return (
    <div className='container'>
      <GatewaysDashboard gateways={[]} getAllGateways={() => { }} />
    </div>
  );
}

export default App;
