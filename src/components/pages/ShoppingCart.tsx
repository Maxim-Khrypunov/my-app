import { Alert, Avatar, Box, Button, Snackbar, Typography } from "@mui/material"
import { DataGrid, GridActionsCell, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/Product Type"
import { useDispatch, useSelector } from "react-redux"
import { ShoppingProductDataType } from "../../model/ShoppingProductDataType"
import { useMemo, useRef, useState } from "react"
import { ShoppingProductType } from "../../model/ShoppingProductType"
import { ordersService } from "../../config/order-service-config"
import { Delete } from "@mui/icons-material"
import { Confirmation } from "./Confirmation"

export const ShoppingCart: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const alertMessage = useRef<string>(""); 
  const newUserAuth = useSelector<any, string>(state => state.auth.userAuth);
  const title = useRef<string>("");
  const content = useRef<string>("");
   const confirmFn = useRef<(Ok: boolean)=>void>((OK)=> {});
   const [openConformation, setOpenConformation] = useState<boolean>(false);
   const columns: GridColDef[] = [
    {
      field: "image",
      sortable: false,
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (<Avatar src={params.value.startsWith("http") ? 
      params.value : `image/${params.value}`}sx={{ width: "40%", height: "80px" }}/>),
      align: "center",
      headerAlign: "center",
    },
    { field: "title", headerName: "Title", flex: 1, align: "center", headerAlign: "center" },
    { field: "unit", headerName: "Unit", flex: 0.5, align: "center", headerAlign: "center" },
    { field: "count", headerName: "Count", flex: 0.4, editable: true, type: "number", align: "center", headerAlign: "center" },
    { field: "cost", headerName: "ILS", flex: 0.4, type: "number", align: "center", headerAlign: "center" },
    { field: "totalCost", headerName: "Total cost in ILS", flex: 0.6, type: "number", align: "center", headerAlign: "center" },
    {
      field: "actions",
      type: "actions",
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      getActions: (params) => [
        <GridActionsCellItem
          label="remove"
          icon={<Delete />}
          onClick={async () => {
            title.current = "Do you want to remove this product?";
            content.current = `You are about to remove this product from your list`;
            confirmFn.current = removeOneProduct;
            setOpenConformation(true);
             async function removeOneProduct(isOk: boolean) {
    if (isOk) {
      await ordersService.removeShoppingProduct(newUserAuth, params.id as string);
    }
    setOpenConformation(false);
  }
          }}
        />,
      ],
    },
  ];


  const shopping: ShoppingProductType[] = useSelector<any, ShoppingProductType[]>(state => state.shoppingState.shopping);
  const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);
  const tableData = useMemo(() => getTableData(), [products, shopping]);
  async function updateCount(newRow:any):Promise<any>
  {
   const rowData: ShoppingProductDataType = newRow;
  if (rowData.count <1)
  {throw "count must be more that 0"}
    await ordersService.addShoppingProduct(newUserAuth, rowData.id!,{id:rowData.id!, count: rowData.count})
    return newRow;  
  }

  function getTableData(): ShoppingProductDataType[] {
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
  

  function ButtonDeleteAll() {
    title.current = "Do you want remove all product?";
    content.current = `You are going remove all products from your shopping cart `;
    confirmFn.current = actualRemoveforAll;
      setOpenConformation(true);
  }
 function actualRemoveforAll(Ok: boolean) {
      if (Ok) {
        shopping.map((elements) => {
        products.find((product) => product.id === elements.id)
        ordersService.removeShoppingProduct(newUserAuth, elements.id)})}
        setOpenConformation(false);
    }

  const totalCostOfAllProducts = tableData.reduce((acc, price) => acc + price.totalCost, 0)

  return <Box sx={{ width: "80vw", heigth: "80vh" }}>
    <DataGrid columns={columns} rows={tableData} getRowHeight={() => "auto"}
    processRowUpdate={updateCount} onProcessRowUpdateError={(error) => {alertMessage.current =error; setOpen(true)}}></DataGrid>
    <Typography variant="h4" sx={{ textAlign: "right", marginTop: "2vh" }}>
      Total Cost: {totalCostOfAllProducts.toFixed(1)} ILS
    </Typography>
    <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
        <Alert severity="error" sx={{ width: '40vw', fontSize:"1.5em" }}>
          {alertMessage.current}
        </Alert>
      </Snackbar>
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button variant="outlined" onClick={ButtonDeleteAll} sx={{ marginRight: "2vw", background: "red", color: "black" }}>Delete all</Button>
        <Button onClick={async ()=> await ordersService.createOrder(newUserAuth,tableData)} variant="outlined" sx={{ marginLeft: "2vw", background: "green", color: "black" }} >Order</Button>
        </Box>
    </Box>
    <Confirmation confirmFn={confirmFn.current} open={openConformation}
         title={title.current} content={content.current}></Confirmation>
    
  </Box>
}
