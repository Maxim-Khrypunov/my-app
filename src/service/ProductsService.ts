import { CategoryType } from "../model/Category Type";
import { ProductType } from "../model/Product Type";
import { Observable } from "rxjs";
export default interface ProductsService {
    addProduct(product: ProductType): Promise<void>;
    changeProduct(product: ProductType): Promise<void>;
    addCategory(category: CategoryType): Promise<void>;
    removeProduct(id: string): Promise<void>;
    removeCategory(category: string): Promise<void>;
    isCategoryExist (category:string): Promise<boolean>;
    setProducts(): Promise<number>;
    getProducts(): Observable<ProductType[]>
    getCategories():Observable<CategoryType[]>

}