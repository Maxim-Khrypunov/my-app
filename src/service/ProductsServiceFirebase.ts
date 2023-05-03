import { CategoryType } from "../model/Category Type";
import { ProductType } from "../model/Product Type";
import ProductsService from "./ProductsService";
import productsConfig from "../config/products-config.json"
import { FirebaseApp } from "../config/firebase-config";
import { collectionData } from "rxfire/firestore";
import {getFirestore, collection, getDoc, deleteDoc, setDoc, getCountFromServer, doc, getDocs} from "firebase/firestore"
import { getRandomNumbers } from "../util/random";
import { Observable } from "rxjs";
export const PRODUCTS_COLLECTION = "products";
export const CATEGORIES_COLLECTION = "categories";
export class ProductsServiceFirebase implements ProductsService {
    productsCollection = collection(getFirestore(FirebaseApp), PRODUCTS_COLLECTION);
    categoriesCollection = collection(getFirestore(FirebaseApp), CATEGORIES_COLLECTION);
    async addProduct(product: ProductType): Promise<void> {
        product.id = getRandomNumbers(100000, 999999).toString();
        await setDoc(doc(this.productsCollection, product.id), product);
    }

    async changeProduct(product: ProductType): Promise<void> {
        product.id = product.id
        await setDoc(doc(this.productsCollection, product.id), product);
    }

    async addCategory(category: CategoryType): Promise<void> {
        await setDoc(doc(this.categoriesCollection, category.name), category);
    }
    async removeProduct(id: string): Promise<void> {
        await deleteDoc(doc(this.productsCollection, id))
    }
    async removeCategory(category: string): Promise<void> {
        await deleteDoc(doc(this.categoriesCollection, category))
    }
    async isCategoryExist(category: string): Promise<boolean> {
        return (await getDoc(doc(this.categoriesCollection, category))).exists()
    }
    async setProducts(): Promise<number> {
        const collectionData = (await getCountFromServer(this.productsCollection)).data();
        let count: number = collectionData.count;
        console.log(`Collection ${PRODUCTS_COLLECTION} contains ${count} products`)
        if (count == 0) {
            const products: ProductType[] = productsConfig.map(pc => {
                const category = pc.name.split("-")[0];
                return {category,cost: pc.cost,image: pc.name + ".jpg",
                title: pc.name,unit: pc.unit};
            })
            for (let i = 0; i < products.length; i++) {
                const categoryExists: boolean =
                 await this.isCategoryExist(products[i].category);
                 if(!categoryExists) {
                   await this.addCategory({name:products[i].category});
                 }
                 await this.addProduct(products[i]);
                 count++;
            }
            console.log(`created ${count} products`)
        }
        return count;
    }

getProducts():Observable<ProductType[]>
 {
    return collectionData(this.productsCollection) as Observable<ProductType[]>
}
}


