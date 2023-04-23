import { useSelector } from "react-redux"
import { ProductsClient } from "./ProductsClient"
import { ProductsAdmin } from "./ProductsAdmin"


export const Products: React.FC =() =>
{
    const userAuth = useSelector<any,string>(state => state.auth.userAuth)
    return userAuth ==" "|| userAuth.includes("admin")? <ProductsAdmin/>:<ProductsClient/>
}
