import React, { useEffect, useState } from "react"
import timeZones from "../time-zones"
import { Input } from "./Input"
 
type Proops =
{
    cityCountry: string
}
export const Timer:React.FC<Proops>= ({cityCountry}) =>
{
    const style1: React.CSSProperties= {backgroundColor:"lightblue", fontSize:"2em", color: "red",
    textAlign:"center"}
    const style2: React.CSSProperties= {backgroundColor:"lightblue", fontSize:"2em", color: "blue",
    textAlign:"center"}

   const [time, Settime] = useState(new Date())
    function tic()
    {
        Settime(new Date()) 
    }
    useEffect(()=>
    {
    const interval = setInterval(tic,1000)
    return ()=> clearInterval(interval)
    }
    ,[])
    const [newStyle, SetStyle] = useState(style1)
    function getNewStyle()
    {
        SetStyle((styleColor)=>styleColor===style1?style2:style1)
    }

    useEffect(()=>{
        const StyleNew = setInterval(getNewStyle,2000)
        return ()=> clearInterval(StyleNew)
    }
    ,[])
    const findIndex = timeZones.findIndex(element=>JSON.stringify(element).includes(cityCountry))
    
    function checkIndex(index: number)
    {
        let indexofTimeZone = index
        return indexofTimeZone ===-1? indexofTimeZone=195:indexofTimeZone;
    }
    const [ChangeTimeZone, SetNewTimeZone] = useState(checkIndex(findIndex))
    const [ChangeNameTimeZone,NameofNewTimeZone] = useState(cityCountry)
    function submitNewTimeZone(value:string):any
    {
        const findIndex = timeZones.findIndex(element=>JSON.stringify(element).includes(value))
        let res = '';
        if (findIndex === -1) {
           return res = `${value} is wrong city / country, please type again 
            (The first letter of the city or country must be capitalized)`;
        } else {
        SetNewTimeZone(findIndex)
        NameofNewTimeZone(value)
        }}

    return <h1> <Input submitFn={submitNewTimeZone} placeHolder={"Enter New TimeZONE"} buttonName="New TimeZone"/>
    <p style={newStyle}>Current Time {ChangeNameTimeZone}</p>
    <div style={newStyle}>{time.toLocaleTimeString(undefined,{timeZone:timeZones[ChangeTimeZone].name})}</div>
    </h1>
}