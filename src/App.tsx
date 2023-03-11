import React from 'react';

import './App.css';
import { InputTest } from './components/inputTest';
import { Timer } from './components/Timer';




function App()
{
  return <InputTest/>
  // return  <section className='section'><h2 className='firstCoupel'>
  //   <div className='firstCountry'> <Timer cityCountry="Toronto" /></div>
  //   <div className='secondCountry'> <Timer cityCountry="London" /></div></h2>
  //   <h2 className='secondeCoupel'><div className='thirdCountry'> <Timer cityCountry="Japan" /></div>
  //   <div className='fourCountry'><Timer cityCountry="Jerusalem" />
  //   </div></h2></section>;
}

export default App;
