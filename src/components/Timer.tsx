import React from "react"
export const Timer:React.FC=()=>
{
    const styles: React.CSSProperties= {backgroundColor:"lightblue", fontSize:"2em", color: "red",
    textAlign:"center"}
    const stylesH2: React.CSSProperties= {fontSize:"2em", color: "red",textAlign:"center"}
    setTimeout(tic, 1000);
    const [time, setTime] = React.useState(new Date());
    function tic()
    {
       setTime(new Date())
    }
    return <div>
        <h2 style ={stylesH2}>Current time</h2>
        <p style={styles}>{time.toLocaleTimeString()}</p>
    </div>
}