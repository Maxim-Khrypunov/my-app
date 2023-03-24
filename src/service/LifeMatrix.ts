import { getRandomMatrix } from "../util/random"

export default class LifeMatrix
{
    constructor(private _number:number[][]){}
    get number(){
        return this._number
    }
    nextStep():number[][]
    {
        this._number = getRandomMatrix(this._number.length, this._number.length, 0, 1)
        return  this._number;
    }
}