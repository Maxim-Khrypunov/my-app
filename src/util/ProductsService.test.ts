import { productsService } from "../config/products-service-config";
import productsConfig from "../config/products-config.json"
import { getRandomElement, getRandomNumbers } from "./random";

test("setProducts test", ()=> {
productsService.setProducts().then(count => {
expect(count).toEqual(productsConfig.length)
})
})

test ("category bread exists", () =>
{
    productsService.isCategoryExist("bread").then(res => expect(res).toBeTruthy())
})



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
    
    productsService.isCategoryExist(categories[number]).then(res => expect(res).toBeTruth())
})

test ("All categories exist",  ()=>
{
const categories = productsConfig.map(pc =>
    {
        const category = pc.name.split("-")[0];
        return category
    })
Promise.all(categories.map(element=>productsService.isCategoryExist(element))).
then(res => expect(res).toBeTruth())
})

test ("remove category", ()=>
{
productsService.removeCategory("cake")
productsService.isCategoryExist("cake").then(res => expect(res).toBeFalse())
})

test ("add category",()=>
{
productsService.addCategory({name:"matzo"})
productsService.isCategoryExist("matzo").then(res => expect(res).toBeTruthy())
})


