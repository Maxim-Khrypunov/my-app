
import { Box, Card, Grid } from "@mui/material";
import { ProductType } from "../../model/Product Type";
import { useSelector } from "react-redux";
import { CardMedia } from "./CardMedia";
import { CardActions } from "./CardActions";
import { CardContent } from "./CardContent";


export const ProductsClient: React.FC = () => {
    const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);


    return <Box sx={{backgroundImage: 'url(https://img4.goodfon.ru/wallpaper/nbig/5/fc/fon-vypechka-bulochki.jpg)',
    width: "100%", height: "100%", display: "flex", justifyContent: "center",alignItems: "center",}}>
    <Grid container spacing={2} sx={{ marginTop: "20px", marginLeft: "5vw", marginRight: "5vw" }}>
        {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={product.id} >
                <Card sx={{ backgroundColor:"beige",height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <CardMedia image={`image/${product.image}`}/>
                    <CardContent title={product.title} unit={product.unit} cost={product.cost} category={product.category}></CardContent>
                    <CardActions></CardActions>
                </Card>
            </Grid>
        ))}
    </Grid>
</Box>
} 


    
