import React, { useState } from "react";
import { Input } from "./input";
export const InputTest: React.FC = () =>
{
    const [inputValue, setInputValue] = useState<string>("")
    function submit(value: string):string
    {
        setInputValue(value);
        return ``;
    }
    return <div>
        <Input submitFn={submit} placeHolder={"enter any text"} />
       <p>{inputValue}</p> 
    </div>
}