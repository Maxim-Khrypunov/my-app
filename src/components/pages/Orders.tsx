import { useSelector } from "react-redux"
import { OrderType } from "../../model/OrderType";
import { Alert, Box, Modal, Snackbar, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useMemo, useRef, useState } from "react";
import { ordersService } from "../../config/order-service-config";
import { Delete, LocalShipping, Visibility } from "@mui/icons-material";
import { OrderContent } from "../OrderContent";
import { Confirmation } from "./Confirmation";
import { productsService } from "../../config/products-service-config";


function checkDateFormat(date: string): boolean {
    const dateParts = date.split("-");
    let res: boolean = false;
    if (dateParts.length == 3 && dateParts.every(p => !isNaN(+p) && p.length > 1)) {
        res = true;
    }
    return res;
}

export const Orders: React.FC = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [openContent, setOpenContent] = useState(false);
    const orderId = useRef('');
    const alertMessage = useRef('')
    const orders = useSelector<any, OrderType[]>(state => state.ordersState.orders);
    const newUserAuth = useSelector<any, string>(state => state.auth.userAuth);
    const tableData = useMemo(() => getTableData(), [orders]);
    const title = useRef<string>("");
    const content = useRef<string>("");
    const confirmFn = useRef<(Ok: boolean)=>void>((OK)=> {});
    const [openConformation, setOpenConformation] = useState<boolean>(false);

    const columns: GridColDef[] = useMemo(() => getColumns(), [newUserAuth, orders])
    function getTableData(): {
        id: string, email: string, productsAmount: number,
        cost: number, orderDate: string, deliveryDate: string
    }[] {
        return orders.map(o => ({
            id: o.id, email: o.email,
            productsAmount: o.shopping.length,
            cost: o.shopping.reduce((res, cur) => res + cur.cost * cur.count, 0),
            orderDate: o.orderDate, deliveryDate: o.deliveryDate
        }));
    }
    function getColumns(): GridColDef[] {
        const commonColumns: GridColDef[] = [
            { field: 'id', headerName: 'ID', flex: 0.4 },
            {
                field: 'productsAmount', headerName: 'Amount', flex: 0.3, type: "number",
                headerAlign: 'center', align: 'center'
            },
            {
                field: 'cost', headerName: 'Cost', flex: 0.4, type: "number",
                headerAlign: 'center', align: 'center'
            },
            { field: 'orderDate', headerName: 'Order Date', flex: 0.5 },
            {
                field: 'deliveryDate', headerName: 'Delivery Date', flex: 0.5,
                editable: newUserAuth.includes('admin')
            },
            {
                field: 'actions', type: 'actions', getActions: params => {
                    const res = [<GridActionsCellItem label="details" 
                    icon={<Visibility/>} 
                    onClick={() => {
                        orderId.current = params.id as string;
                        setOpenContent(true);
                    }}/>]
                    if (newUserAuth.includes("admin")) {
                        res.push(<Box><GridActionsCellItem label="delivery"
                         icon={<LocalShipping />}
                        disabled={!!params.row.deliveryDate}
                           onClick={async () => await delivery(params.id as string,
                               new Date().toISOString().substring(0, 10))}/>
                               <GridActionsCellItem label="remove" icon={<Delete></Delete>}
          onClick={async () => {
            title.current = "Do you want to remove this order?";
            content.current = `You are going to remove order`;
            confirmFn.current = removeOneProduct;
            setOpenConformation(true);
           async function removeOneProduct(isOk: boolean) {
    if (isOk) { await ordersService.removeShoppingProduct(newUserAuth,params.id as string);
    }
    setOpenConformation(false);
  }
          }} />
                               </Box>)
   
                    }
                    return res;
                }
            },
           
        ];
        
        if(newUserAuth.includes('admin')) {
            commonColumns.splice(1, 0, { field: 'email', headerName: 'Customer', flex: 0.8 })
        }
        
        return  commonColumns;
    }
    async function delivery(id: string, date: string) {
        const order = { ...orders.find(o => o.id == id)!, deliveryDate: date };
        if(!!order.id) {
               await ordersService.updateOrder(order!)
        }
     
    }
    function updateError(error: any) {

        alertMessage.current = JSON.stringify(error);
        setOpenAlert(true)
    }
    async function updateDeliveryDate(newRow: any) {
        const newDeliveryDate = newRow.deliveryDate;
        const orderDate = newRow.orderDate;

        if (newDeliveryDate) {
            if (!checkDateFormat(newDeliveryDate)) {
                throw `${newDeliveryDate} has wrong format`
            }
            if (newDeliveryDate < orderDate) {
                throw `${newDeliveryDate} must not be less than order date`
            }
            if (newDeliveryDate > new Date().toISOString().substring(0, 10)) {
                throw `${newDeliveryDate} must not be greater than current date`
            }
            

        } 
        await delivery(newRow.id, newDeliveryDate);
        return newRow;
    }
    return <Box sx={{
        display: "flex", flexDirection: "column", height: "80vh",
        justifyContent: "center", alignItems: "center"
    }}>
        <Box sx={{ width: "80vw", height: "50vh" }}>
            <DataGrid rows={tableData} columns={columns} processRowUpdate={updateDeliveryDate}
                onProcessRowUpdateError={updateError} />
        </Box>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
            <Alert severity="error" sx={{ width: '80vw', fontSize: '1.5em' }}>
                {alertMessage.current}
            </Alert>
        </Snackbar>
        <Modal open={openContent} onClose={() => setOpenContent(false)}>
            <Box>
                 <OrderContent orderId={orderId.current}/>
            </Box>
           
        </Modal>
        <Confirmation confirmFn={confirmFn.current} open={openConformation}
         title={title.current} content={content.current}></Confirmation>
    </Box>
}