import { Application, Request, Response } from "express";
import { Order } from "../model/order"; 
import { Customer } from "../model/customer"; 


const orderService = require('../service/orderService')

const customerService = require('../service/customerService')

module.exports = function(app: Application){

    app.get('/orders', async (req: Request, res: Response) => {
        
        let data: Order[]


        try {
            data = await orderService.getOrders()
        } catch (e) {
            console.error(e);
        }

        res.render('list-orders', { orders: data })
    })

    app.get('/orders/:id', async (req: Request, res: Response) => {
        let data: Order

        try {
            data = await orderService.getOrderById(req.params.id)
            //console.log(data.)
        } catch (e) {
            console.error(e);
        }

        res.render('view-order', {order: data})
    })

    app.get('/add-order', async (req: Request, res: Response) => {
        let customerIDs: Customer[] 
        try {
            customerIDs = await customerService.getCustomers()
        } catch (e) {
            console.error(e);
        }
        console.log(customerIDs)
        res.render('add-order', {customers: customerIDs})
    })

    app.post('/add-order', async (req: Request, res: Response) => {
        let data: Order = req.body
        let id: Number
        try {
            id = await orderService.createOrder(data)
            res.redirect('/orders/' + id)
        } catch (e) {
            console.error(e);
            res.locals.errormessage = e.message
            res.render('add-order', req.body)
        }
    })

    app.get('/add-customerid', async (req: Request, res: Response) => {
        if (!req.session.order) {
            req.session.order = {}
        }

        res.render('add-customerid')
    })

    app.post('/add-customerid', async (req: Request, res: Response) => {
        req.session.order["customerID"] = req.body.name

        res.redirect('/add-orderdate')
    })

    app.get('/add-orderdate', async (req: Request, res: Response) => {
        res.render('add-orderdate')
    })

   app.post('/add-orderdate', async (req: Request, res: Response) => {
        req.session.order["orderDate"] = req.body.description
        res.redirect('/add-order-confirmation')
   }) 

   app.get('/add-order-confirmation', async (req: Request, res: Response) => {
    res.render('add-order-confirmation', req.session.product)
})

app.post('/add-order-confirmation', async (req: Request, res: Response) => {
    let data: Order = req.session.order
    let id: Number

    try {
        id = await orderService.createOrder(data)

        req.session.order = undefined
        res.redirect('/orders/' + id) 
    } catch (e) {
        console.error(e);
        res.locals.errormessage
        res.render('add-order-confirmation', req.session.order)
    }
})

}