import { Order } from "../model/order";

module.exports.validateOrder = function (order: Order): string {

    const orderDate = new Date(order.orderDate);
    if(orderDate < new Date(orderDate.getFullYear() - 1)){
        return "Order date is older than a year"
    }
    return null
}

