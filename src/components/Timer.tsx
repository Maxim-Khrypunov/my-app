import React from "react"
export const Timer:React.FC=()=>
{
   
    const styles: React.CSSProperties= {backgroundColor:"lightblue", fontSize:"2em", color: "red",
    textAlign:"center"}
    let stylesH2: React.CSSProperties= {fontSize:"2em",color: "red",textAlign:"center"}
    let stylesH3: React.CSSProperties= {fontSize:"2em",color: "blue",textAlign:"center"}
    setTimeout(tic, 1000);
   
    const [time, setTime] = React.useState(new Date());
    function tic()
    {
       setTime(new Date())
    } 

    setTimeout(switfColor,5000)
  
    let [changer,newColor] = React.useState(stylesH3);
    function switfColor()
    {
        newColor(stylesH2); 
        setTimeout(restart,5000);  
    }
    function restart()
    {
       window.location.reload()
    }
    
    return <div>
    <h2 className="text" style ={changer}> Current time </h2>
    <p style={styles}>{time.toLocaleTimeString()}</p>
    </div>
    }