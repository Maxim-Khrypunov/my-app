import React from "react"
import { useSelector } from "react-redux"

export const CounterSquare: React.FC=()=>
{
const newCounter = useSelector<any,number>(state=>state.count.counter);
return <div>
<p>counter value is {newCounter}, couneter^2 is {newCounter**2}</p>
</div>
}