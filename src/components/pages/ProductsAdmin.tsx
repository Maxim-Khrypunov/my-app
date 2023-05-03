import { Alert, Avatar, Box, Snackbar, Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/Product Type"
import { useSelector } from "react-redux"
import { useRef, useState } from "react"
import { productsService } from "../../config/products-service-config"
import { Delete, Style } from "@mui/icons-material"

export const ProductsAdmin: React.FC=() =>
{
const [open, setOpen] =useState<boolean>(false);
const alertMessage = useRef<string>("");
const products: ProductType[]=useSelector<any,ProductType[]>(state=>state.productsState.products);

async function updateProduct(newData: ProductType, oldData: ProductType, updateType: string): Promise<any> 
{
  if (updateType==='price') {
    const rowDataNewPrice: ProductType = newData;
    const rowDataOldPrice: ProductType = oldData;
    if (rowDataNewPrice.cost > (rowDataOldPrice.cost*1.5)) {
      throw "Update cannot be greater than 50% from the existing cost";
    };
    await productsService.changeProduct({
      id: rowDataNewPrice.id,
      cost: rowDataNewPrice.cost,
      title: rowDataNewPrice.title,
      category: rowDataNewPrice.category,
      unit: rowDataNewPrice.unit,
      image: rowDataNewPrice.image
    });
    return newData;
  } else if (updateType==='title') {
    const rowDataTitle: ProductType = newData;
    if (!rowDataTitle.title) {throw "Title must not be empty"};
    await productsService.addProduct({
      id: rowDataTitle.id,
      cost: rowDataTitle.cost,
      title: rowDataTitle.title,
      category: rowDataTitle.category,
      unit: rowDataTitle.unit,
      image: rowDataTitle.image
    });
    return newData;
  }
}

const columns: GridColDef[] =
[
 {field:"image", headerName:"Image", sortable:false, flex:1, renderCell:(params)=><Avatar src={`image/${params.value}`}
 sx={{width:"30%", height:"80px"}}/>, align: "center", headerAlign: "center"},
 {field:"title", headerName:"Title", flex:1, editable: true,  align: "center", headerAlign: "center"},
 {field:"category", headerName:"Category", flex:0.7,  align: "center", headerAlign: "center"},
 {field:"unit", headerName:"Unit", flex:0.5,  align: "center", headerAlign: "center"},
 {field:"cost", headerName:"ILS", flex:0.4, editable: true,  align: "center", headerAlign: "center"},
 {field:"actions", type:"actions", flex: 0.1,  align: "center", headerAlign: "center", getActions:(params) => [
    <GridActionsCellItem label="remove" icon={<Delete></Delete>}
    onClick={async ()=> await productsService.removeProduct(params.id as string)}/>
  ]}
]
return <Box sx={{width:"90vw", heigth:"90vh"}}>
    <DataGrid processRowUpdate={(newData: any, oldData: any) =>
    updateProduct(newData, oldData, 'price')}  onProcessRowUpdateError={(error)=>{alertMessage.current=error; setOpen(true)}} 
    columns={columns} rows={products} getRowHeight={()=>"auto"}></DataGrid>
    <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
        <Alert severity="error" sx={{ width: '40vw', fontSize:"1.5em" }}>
          {alertMessage.current}
        </Alert>
      </Snackbar>
</Box>
}