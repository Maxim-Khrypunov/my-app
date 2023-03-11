import React, { useEffect, useRef, useState } from "react";
import { Alert } from "./alert";
type Props=
{
    submitFn:(value:string) => string;
    placeHolder:string;
    buttonName?: string;
}
export const Input: React.FC<Props> = ({submitFn,placeHolder,buttonName}) =>
{
    const id = useRef<string>(``);
    const inputElement = useRef<HTMLInputElement|null>();
    const [message, setMessage] = useState<string>("");

    useEffect(() =>
    {
        id.current = Math.random().toString();
        inputElement.current = document.getElementById(id.current) as HTMLInputElement
    },[]);
    function inputProcess()
    {
    setMessage(submitFn(inputElement.current!.value))
    }
    return <div>
        <input type="text" placeholder={placeHolder} id={id.current}/>
        <button onClick={inputProcess}>{buttonName || "GO"}</button>
        {message && <Alert message={""}/>}
    </div>
}