import React from 'react'
import Divider from '@material-ui/core/Divider'
import {TextDetail} from '../UIkit'
import {OrderProducts} from './index'

const dateTimeToString = (date) => {
    return date.getFullYear() + "-"
        + ('00' + (date.getMonth()+1)).slice(-2) + "-"
        + ('00' + date.getDate()).slice(-2) + " "
        + ('00' + date.getHours()).slice(-2) + ":"
        + ('00' + date.getMinutes()).slice(-2) + ":"
        + ('00' + date.getSeconds()).slice(-2)
}

const dateToString = (date) => {
    return date.getFullYear() + "-"
        + ('00' + (date.getMonth()+1)).slice(-2) + "-"
        + ('00' + date.getDate()).slice(-2)
}

const OrderHistoryItem = (props) => {
    const order = props.order
    const orderedDateTime = dateTimeToString(order.updated_at.toDate())
    const shippingDate = dateToString(order.shipping_date.toDate())
    const price = "$" + order.amount.toFixed(2).toLocaleString()

    return (
        <div>
            <div className="modele-spacer--small" />
            <TextDetail label={"Order ID"} value={order.id} />
            <TextDetail label={"Date"} value={orderedDateTime} />
            <TextDetail label={"Estimated Shipment"} value={shippingDate} />
            <TextDetail label={"Total"} value={price} />

            {order.products.length > 0 && (
                <OrderProducts products={order.products} />
            )}

            <div className="module-spacer--extra-extra-small" />
            <Divider />
        </div>
    )
}

export default OrderHistoryItem