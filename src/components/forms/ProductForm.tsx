import { Alert, Avatar, Box, Button, Card, CardMedia, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import { useState, useRef } from "react";
import { ProductType } from "../../model/Product Type";
import { useSelector } from "react-redux";
import { CategoryType } from "../../model/Category Type";
import productParametersConfig from "../../config/product - parameters-config.json"


type Props = {
    submitFn: (product: ProductType) => string
}


const initialProduct: ProductType = {
    category: '', image: '', cost: 0,
    title: '', unit: ''};
export const ProductForm: React.FC<Props> = ({ submitFn }) => 

{
    const [product, setProduct] = useState<ProductType>(initialProduct);
    const [open, setOpen] = useState<boolean>(false);
    const category = useSelector<any,CategoryType[]>(state=>state.categoryState.category);
    const image = useRef<string>('');
    const title = useRef<string>('');
    const alertMessage = useRef<string>('');
    

    function onSubmitFn(event: any) 
    {
        event.preventDefault(); //canceling default form submit
        alertMessage.current = submitFn(product);
        if (!alertMessage.current) {
            document.querySelector("form")!.reset();
        }
        setOpen(true)
    }

    function imageHandler(event: any) {
        const urlImage = event.target.value;
        image.current = urlImage;
        setProduct({...product, image: urlImage});
    }

    function titleHandler(event: any) {
        const newTitle = event.target.value;
        title.current = newTitle;
        setProduct({...product, title:newTitle});
    }

    function categoryHandler(event: any)
    {
        const newCategory = event.target.value;
        title.current = newCategory;
        setProduct({...product,category:newCategory});
    };

    function costHandler(event: any) {
        const newCost = event.target.value;
        title.current = newCost;
        setProduct({...product, cost: newCost});
    }

    function unitHandler(event: any) {
        const newUnit = event.target.value;
        title.current = newUnit;
        setProduct({...product, unit: newUnit});
    }


    return <Box>
        <form onSubmit={onSubmitFn}>
            <Grid container spacing={4} justifyContent={'center'}>

                <Grid item xs={8} md={7} style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>1. Choose a picture for your product </h3><TextField label='URL image for product'
                        required fullWidth value={product.image}
                         onChange={imageHandler}/>
                </Grid>

                <Grid item xs={5}>
                    {image.current && <CardMedia image={image.current} sx={{width: "30vw",
                     height: "20vw"}}/>}
                </Grid>

                <Grid item xs={8} md={7} style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>2. Please indicate name of product </h3><TextField label='Please indicate name of product'
                        required fullWidth value={product.title}
                         onChange={titleHandler}/>
                </Grid>

                <Grid item xs={8} md={7} style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>3. Please indicate category of product</h3>
                    <Select label='Please indicate category of product'
                        required fullWidth value={product.category}
                         onChange={categoryHandler}>{
                            category.map(category=><MenuItem value={category.name}>{category.name}</MenuItem>)}
                         </Select> 
                </Grid>

                <Grid item xs={8} md={7} style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>4.  Please indicate unit of product </h3><Select label=' Please indicate unit of product'
                        required fullWidth value={product.unit}
                         onChange={unitHandler}>{productParametersConfig.unit.map(unitNew=><MenuItem value={unitNew}>{unitNew}</MenuItem>)}
                         </Select>
                </Grid>

                <Grid item xs={8} md={7} style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>5.  Please indicate cost of product </h3>
                    <TextField label='Please indicate cost of product'
                        fullWidth required type="any"
                        onChange={costHandler}
                         value={product.cost}
                         helperText={`plese write price from ${productParametersConfig.minCost} until ${productParametersConfig.maxCost}`}
                         inputProps={{min:`${productParametersConfig.minCost}`,max:`${productParametersConfig.maxCost}`}}/>
                </Grid>

            
                <Grid item container spacing={5} justifyContent={'center'} xs={12}>
                    <Grid item xs={4}>
                        <Button type='submit'>Submit</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button type='reset'>Reset</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>  
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
    <Alert severity="error" sx={{ width: '40vw', fontSize: "1.5em" }}>
      {alertMessage.current}
    </Alert>
  </Snackbar>
    </Box>
  
}
