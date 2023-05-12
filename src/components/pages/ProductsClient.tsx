import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { ProductType } from "../../model/Product Type";
import { useSelector } from "react-redux";
import { CardMedia } from "./CardMedia";
import { CardContent } from "./CardContent";
import { ShoppingProductType } from "../../model/ShoppingProductType";
import { useMemo } from "react";
import { ordersService } from "../../config/order-service-config";
import { useNavigate } from "react-router-dom";

export const ProductsClient: React.FC = () => {
    const navigate = useNavigate();
    const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);
    const newUserAuth = useSelector<any,string>(state =>state.auth.userAuth)
    const shopping = useSelector<any,ShoppingProductType[]>(state => state.shoppingState.shopping)
    const counts =useMemo (()=> getCounts(), [products,shopping])
    function getCounts(): number[]{
        return products.map(p=>getCountProduct(p))
    }
    function getCountProduct(product:ProductType):number
    {
        const shoppingProduct:ShoppingProductType|undefined = shopping.find(s=> s.id == product.id)
        let count:number = 0;
        if (shoppingProduct)
        {
            count = shoppingProduct.count;
        }
        return count;
    }

    return <Box sx={{backgroundImage: 'url(https://img4.goodfon.ru/wallpaper/nbig/5/fc/fon-vypechka-bulochki.jpg)',
    width: "100%", height: "100%", display: "flex", justifyContent: "center",alignItems: "center",}}>
    <Grid container spacing={2} sx={{ marginTop: "20px", marginLeft: "5vw", marginRight: "5vw" }}>
        {products.map((product,index) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={product.id} >
                <Card sx={{ backgroundColor:"beige",height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <CardMedia image={product.image.startsWith("http")? product.image:`image/${product.image}`}/>
                    <CardContent title={product.title} unit={product.unit} cost={product.cost} category={product.category}></CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom:"2vh"}}>
                    <Button variant="outlined" onClick={async()=>ordersService.removeShoppingProductUnit(newUserAuth,product.id!)} 
                    disabled={counts[index]==0}>-</Button>
                    <Typography sx={{ mx: 2 }}>{counts[index]}</Typography>
                    <Button variant="outlined" onClick={async () =>
                             {
                                if (newUserAuth == '') {
                                    navigate("/login");
                                } else {
                                    ordersService.addShoppingProductUnit(newUserAuth, product.id!);
                                }
                                }}>+</Button>
                    </Box>
                 </Box>
                </Card>
            </Grid>
        ))}
    </Grid>
</Box>
} 

