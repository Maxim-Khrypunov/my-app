import React from "react"
import { useSelector } from "react-redux"
type Props ={
    factor:number
}
export const CounterMultiply: React.FC<Props>=({factor})=>
{
const newCounter = useSelector<any,number>(state=>state.count.counter);
return <div>
<p>value is {newCounter}, factor value is {factor}, counter*factor is {newCounter*factor}</p>
</div>
}