export function getRandomNumbers(min: number, max: number): number
{
 return min + Math.trunc(Math.random()*(max-min));
}
export function getRandomElement(array: any[]): any
{
return array [getRandomNumbers(0, array.length)]
}
export function getRandomMatrix(rows: number, columns: number, minNumber: number,
    maxNumber: number):  number[][] {
       function getRow(): number[] {
           return Array.from(Array(columns)).map(() =>
            getRandomNumbers(minNumber, maxNumber + 1))
       }
       const res: number[][] = Array.from(Array(rows)).map(() => getRow());
      
       return res;
    }