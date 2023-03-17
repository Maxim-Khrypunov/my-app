import React from 'react';
import { useSelector } from 'react-redux';
import { Login } from './components/Login';
import { CounterSquare } from './components/CounterSquare';
import { CounterUpdater } from './components/CounterUpdater';
import { CounterMultiply } from './components/CounterMultiply';
import { Logout } from './components/Logout';

function App()
 {
  const StateMachine: React.FC = () => {   
  const NewauthUser= useSelector<any, string>(state=>state.auth.authUser);
  return <p>{!NewauthUser && <Login/>}
  {NewauthUser && !NewauthUser.includes("admin")&&(<><CounterUpdater operand={5} reset={false}/><CounterSquare/><Logout/></>)}
  {NewauthUser && NewauthUser.includes('admin') && 
    (<><CounterUpdater operand={5} reset={true}/><CounterMultiply factor={5}/><CounterSquare/><Logout/></>)}
  </p>
}
  return  <div style={{display: 'flex', alignItems: 'center',
  flexDirection: 'column', marginTop: '20vh', backgroundColor: 'green'}}>
  <StateMachine/>
  </div>
}

export default App;
