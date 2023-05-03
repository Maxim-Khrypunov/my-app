import { Avatar, Box, Button, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/Product Type"
import { useDispatch, useSelector } from "react-redux"
import { ShoppingProductDataType } from "../../model/ShoppingProductDataType"
import { useMemo } from "react"
import { ShoppingProductType } from "../../model/ShoppingProductType"
import { ordersService } from "../../config/order-service-config"

export const ShoppingCart: React.FC=()=>
{ 
    
    const newUserAuth = useSelector<any,string>(state =>state.auth.userAuth)
    const shopping: ShoppingProductType[] = useSelector<any, ShoppingProductType[]>(state => state.shoppingState.shopping);
    const products: ProductType[]=useSelector<any,ProductType[]>(state=>state.productsState.products);
    const tableData = useMemo(() => getTableData(), [products, shopping]);
    
    function getTableData():ShoppingProductDataType[]
    {
        const orderProducts = shopping.map((elements) => {
            const product = products.find((product) => product.id === elements.id);
            if (product) {
                return {
                      id: product.id,
                      image: product.image,
                      title: product.title,
                      unit: product.unit,
                      cost: product.cost,
                      count: elements.count,
                      totalCost: +(product.cost * elements.count).toFixed(1)
                };
            } else {
                ordersService.removeShoppingProduct(newUserAuth, elements.id);
                return "";
            }
        });
        return orderProducts as ShoppingProductDataType[];
    }

    function ButtonDeleteAll() 
    {
      const orderProducts = shopping.map((elements) => {
        const product = products.find((product) => product.id === elements.id);
        ordersService.removeShoppingProduct(newUserAuth, elements.id)
      })}

 
    const totalCostOfAllProducts = tableData.reduce((acc,price) => acc + price.totalCost, 0)

    const columns: GridColDef[] =
    [
     {field:"image", headerName:"Image", flex:1, renderCell:(params)=><Avatar src={`image/${params.value}`}
     sx={{width:"30%", height:"80px"}}/>, align: "center", headerAlign: "center"},
     {field:"title", headerName:"Title", flex:1},
     {field:"unit", headerName:"Unit", flex:0.5},
     {field:"count", headerName:"Count", flex:0.4},
     {field:"cost", headerName:"ILS", flex:0.4},
     {field:"totalCost", headerName:"Total cost in ILS", flex:0.6},
    ]
    return <Box sx={{width:"80vw", heigth:"80vh"}}>
        <DataGrid columns={columns} rows={tableData} getRowHeight={()=>"auto"}></DataGrid>
        <Typography  variant="h4" sx={{ textAlign: "right", marginTop: "2vh"}}>
                    Total Cost: {totalCostOfAllProducts.toFixed(1)} ILS
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button variant="outlined" onClick={ButtonDeleteAll} sx={{marginRight:"2vw", background:"red",  color: "black"}}>Delete all</Button>
      <Button variant="outlined"sx={{marginLeft:"2vw",  background:"green", color: "black"}} >Make payment</Button>
    </Box>
  </Box>
    </Box>
    }
