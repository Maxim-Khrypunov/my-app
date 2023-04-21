/**
 * @jest-environment node
 */
import { productsService } from "../config/products-service-config";
import productsConfig from "../config/products-config.json"
import { getRandomNumbers } from "./random";
jest.setTimeout(300000)

test("setProducts test", () => 
    productsService.setProducts().then(count => {
        expect(count).toEqual(38);
    })
)

test ("category bread exists", () =>
productsService.isCategoryExist("bread").then(res => expect(res).toBeTruthy())
)



// Home work 42


 
test ("Random category exists", ()=>
{
    const categories = productsConfig.map(pc =>
        {
            const category = pc.name.split("-")[0];
            return category
        })

    console.log(categories)
    const number = getRandomNumbers(0,productsConfig.length)
    
    productsService.isCategoryExist(categories[number]).then(res => expect(res).toBeTruthy())
})

test ("All categories exist",  ()=>
{
const categories = productsConfig.map(pc =>
    {
        const category = pc.name.split("-")[0];
        return category
    })
Promise.all(categories.map(element=>productsService.isCategoryExist(element))).
then(res => expect(res.every(elem=>elem))).then(res=>res.toBeTruthy())
})

test ("remove category", ()=>
{
productsService.removeCategory("cake").then(()=>
productsService.isCategoryExist("cake").then(res => expect(res).toBeFalsy()))

})

test ("add category",()=>
{
productsService.addCategory({name:"cake"}).then(()=>
productsService.isCategoryExist("cake").then(res => expect(res).toBeTruthy()))

})


