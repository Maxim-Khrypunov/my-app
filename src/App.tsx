import React from 'react';
import { useSelector } from 'react-redux';
import { Login } from './components/Login';
import { CounterSquare } from './components/CounterSquare';
import { CounterUpdater } from './components/CounterUpdater';
import { CounterMultiply } from './components/CounterMultiply';
import { Logout } from './components/Logout';

const StateMachine: React.FC = () => {   
  const authUser= useSelector<any, string>(state=>state.auth.authUser);
  return <p>{!authUser && <Login/>}
  {authUser && !authUser.includes("admin")&&(<><CounterUpdater operand={2}/><CounterSquare/><Logout/></>)}
  {authUser && authUser.includes('admin') && 
    (<><CounterUpdater operand={2} reset={true}/><CounterMultiply factor={2}/><CounterSquare/><Logout/></>)}
  </p>
}


function App()
{
  return  <div style={{display: 'flex', alignItems: 'center',
  flexDirection: 'column', marginTop: '15vh'}}>
  <StateMachine/>
  </div>
}

export default App;
