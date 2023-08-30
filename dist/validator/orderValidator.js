"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.validateOrder = function (order) {
    var orderDate = new Date(order.orderDate);
    if (orderDate < new Date(orderDate.getFullYear() - 1)) {
        return "Order date is older than a year";
    }
    return null;
};
//# sourceMappingURL=orderValidator.js.map