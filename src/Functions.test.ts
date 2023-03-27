import { sumArray, sumMatrix, sumRows } from "./util/functions";
import { minEvenNumber } from "./util/functions";
import { mapperNumbers } from "./util/functions";
import LifeMatrix from "./service/LifeMatrix";
import { getRandomMatrix } from "./util/random";

test("test function sumArray", () => 
{
const array:number[]= [1,2,3];
expect(sumArray(array)).toEqual(6)
})

test("test function minEvenNumber", () => 
{
const array:number[]= [4,-1,1,2,3,0];
expect(minEvenNumber(array)).toEqual(0)
})

test("test minEvenNumber with no even number", () => 
{
const array:number[]= [-1,1,3];
expect(minEvenNumber(array)).toBeUndefined
})

test("test mapper", () => 
{
const sourceAr: number[] = [1,2,3];
const expectedAr: number[] = [1,4,9];
expect(mapperNumbers(sourceAr, (num:number) => num**2)).toEqual(expectedAr)
})

test("text of sumMatrix", ()=>{
    const matrix = [[1,0,0,1], [0,0,0,1]];
    expect(sumMatrix(matrix)).toEqual(3) 
})
///HW 37
test("text the sum of the elements of each row of the matrix", ()=>{
    const startMatrix = new LifeMatrix
    ([[0,0,0,0,0], 
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]]);
const newMatrix: number[][] = startMatrix.nextStep()
const expectMatrix = [0,0,3,0,0];
expect(sumRows(newMatrix)).toEqual(expectMatrix) 
})


test("text of get part of Matrix", ()=>{
    const startMatrix = new LifeMatrix
    ([[0,0,0,0,0], 
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0]]);
    const expectMatrix = 
    [[0,0,0], 
    [0,0,0],
    [0,1,1]];
    expect(startMatrix.getMatrixPart(1, 1)).toEqual(expectMatrix) 
})

test("text receive new Matrix", ()=>{
    const startMatrix = new LifeMatrix
    ([[0,0,0,0,0], 
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]]);
    const expectMatrix = 
    ([[0,0,0,0,0], 
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0]]);
   
    expect(startMatrix.nextStep()).toEqual(expectMatrix) 
})

test("text size of row Matrix", ()=>{
    const startMatrix = new LifeMatrix
    ([[0,0,0,0,0], 
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]]);
    const SizeOfNewMatrix: number[][] = startMatrix.nextStep()
    expect(SizeOfNewMatrix[4].length).toEqual(5) 
})

