import OrdersServiceFirebase from "../service/OrderServiceFirebase";
import OrdersService from "../service/OrdersService";

export const ordersService: OrdersService = new OrdersServiceFirebase()