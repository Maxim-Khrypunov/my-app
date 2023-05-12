import { Alert, Avatar, Box, Button, Snackbar, Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/Product Type"
import { useSelector } from "react-redux"
import { useRef, useState } from "react"
import { productsService } from "../../config/products-service-config"
import { Add, Delete } from "@mui/icons-material"
import { ProductForm } from "../forms/ProductForm"

export const ProductsAdmin: React.FC = () => {
  // const { unit, minCost, maxCost}
  const [open, setOpen] = useState<boolean>(false);
  const [flagAdd, setflagAdd] = useState<boolean>(false);
  const alertMessage = useRef<string>("");
  const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);

  async function updateProduct(newData: ProductType, oldData: ProductType): Promise<any> {
    if (newData.cost != oldData.cost) 
      {if (newData.cost > (oldData.cost * 1.5)) { throw "Update cannot be greater than 50% from the existing cost" }}
    if (newData.title != oldData.title) { if (!newData.title.trim()) { throw "Title must not be empty" }}
    await productsService.changeProduct(newData);
    return newData;
  }
  function submitAddProduct(product: ProductType): string {
    let res = '';
    if (products.find(p => p.title == product.title && p.unit == product.unit)) {
        res = `product ${product.title} with unit ${product.unit} already exists`
    } else {
        productsService.addProduct(product);
        setflagAdd(false);
    }
    
    return res;
}

  const columns: GridColDef[] =
    [
      {
        field: "image", headerName: "Image", sortable: false, flex: 1, editable: true, renderCell: (params) => 
        <Avatar src={params.value.startsWith("http")?params.value:`image/${params.value}`}
        sx={{ width: "30%", height: "80px" }} />, align: "center", headerAlign: "center"
      },
      { field: "title", headerName: "Title", flex: 1, editable: true, align: "center", headerAlign: "center" },
      { field: "category", headerName: "Category", flex: 0.7, align: "center", headerAlign: "center" },
      { field: "unit", headerName: "Unit", flex: 0.5, align: "center", headerAlign: "center" },
      { field: "cost", headerName: "ILS", flex: 0.4, editable: true, align: "center", headerAlign: "center" },
      {
        field: "actions", type: "actions", flex: 0.1, align: "center", headerAlign: "center", getActions: (params) => [
          <GridActionsCellItem label="remove" icon={<Delete></Delete>}
            onClick={async () => await productsService.removeProduct(params.id as string)} />
        ]
      }
    ]
  return !flagAdd ? <Box sx={{width:"100vw", display:"flex",flexDirection:"column", justifyContent:"centre", alignItems:"center"}}>
    <Box sx={{ width: "90vw", heigth: "60vh" }}>
    <DataGrid processRowUpdate={(newData:  ProductType, oldData: ProductType) =>
      updateProduct(newData, oldData)} onProcessRowUpdateError={(error) => { alertMessage.current = error; setOpen(true) }}
      columns={columns} rows={products} getRowHeight={() => "auto"}></DataGrid></Box>
    <Button onClick={()=>setflagAdd(true)}>
      <Add/>
    </Button>
    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert severity="error" sx={{ width: '30vw', fontSize: '1.5em' }}>
                {alertMessage.current}
            </Alert>
        </Snackbar>
  </Box> : <ProductForm submitFn={submitAddProduct}/>
}