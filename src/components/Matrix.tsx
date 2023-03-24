import { Row } from "./Row"
import { ReactNode } from "react"
type Props=
{
    matrix:number[][]
}
export const Matrix: React.FC<Props>=({matrix})=>
{
 function getRows()
 {
 return matrix.map((row,index)=> <Row row={row} key={index}></Row>)
 }
 return <div style={{display:"flex", flexDirection:"column"}}>{getRows()}</div>
}