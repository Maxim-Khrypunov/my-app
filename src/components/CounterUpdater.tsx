import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { counterActions } from "../redux/conterSlice"
type Props=
{
operand:number
}
export const CounterUpdater: React.FC<Props> = ({operand})=>
{
    const newauth = useSelector<any,string>(state=>state.auth. userAuth)
    const dispatch = useDispatch();
return <div>
    <button onClick ={()=>dispatch(counterActions.increment(operand))}>Increment</button>
    <button onClick ={()=>dispatch(counterActions.decremant(operand))}>Decremant</button>
    {newauth.includes("Admin")&& <button onClick ={()=>dispatch(counterActions.reset())}>Reset</button>}
</div>
}