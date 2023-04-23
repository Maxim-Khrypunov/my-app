import { Avatar, Box, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/Product Type"
import { useSelector } from "react-redux"

export const ProductsAdmin: React.FC=() =>
{
const products: ProductType[]=useSelector<any,ProductType[]>(state=>state.productsState.products);
const columns: GridColDef[] =
[
 {field:"image", headerName:"Image", flex:1, renderCell:(params)=><Avatar src={`image/${params.value}`}
 sx={{width:"30%", height:"80px"}}/>, align: "center", headerAlign: "center"},
 {field:"title", headerName:"Title", flex:1},
 {field:"category", headerName:"Category", flex:0.7},
 {field:"unit", headerName:"Unit", flex:0.5},
 {field:"cost", headerName:"ILS", flex:0.4}
]
return <Box sx={{width:"80vw", heigth:"80vh"}}>
    <DataGrid columns={columns} rows={products} getRowHeight={()=>"auto"}></DataGrid>
</Box>
}