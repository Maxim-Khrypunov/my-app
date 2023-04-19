import { productsService } from "../config/products-service-config";
import productsConfig from "../config/products-config.json"

test("setProducts test", ()=> {
productsService.setProducts().then(count => {
expect(count).toEqual(productsConfig.length)
})
})

test ("category bread exists", () =>
{
    productsService.isCategoryExist("bread").then(res => expect(res).toBeTruth())
})