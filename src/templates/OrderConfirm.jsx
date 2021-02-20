import React, {useCallback, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProductsInCart} from '../reducks/users/selectors'
import {makeStyles} from "@material-ui/styles"
import {CartListItem} from '../components/Products'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import {PrimaryButton, TextDetail} from '../components/UIkit'
import { orderProduct } from '../reducks/products/operations'

const useStyles = makeStyles((theme) => ({
    detailBox: {
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            width: 512
        }
    },
    orderBox: {
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        boxShadow: '0 4px 2px 2px rgba(0, 0, 0, 0.2)',
        height: 256,
        margin: '24px auto 16px auto',
        padding: 16,
        width: 288
    }
}))

const OrderConfirm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const productsInCart = getProductsInCart(selector)

    const subtotal = useMemo(() => {
        return productsInCart.reduce((sum, product) => sum += product.price, 0)
    }, [productsInCart])

    const shippingFee = (subtotal >= 10000) ? 0 : 3

    const tax = subtotal * 0.16

    const total = subtotal + shippingFee + tax

    const order = useCallback(() => {
        dispatch(orderProduct(productsInCart, total))
    }, [productsInCart, total])

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">Confirm Order</h2>
            <div className="p-grid__row">
                <div className={classes.detailBox}>
                    <List>
                        {productsInCart.length > 0 && (
                            productsInCart.map(product => <CartListItem product={product} key={product.cartId}/>)
                        )}
                    </List>
                </div>
                <div className={classes.orderBox}>
                            <TextDetail label={"Subtotal"} value={"$" + subtotal.toFixed(2).toLocaleString()} />
                            <TextDetail label={"Tax"} value={"$" + tax.toFixed(2)} />
                            <TextDetail label={"Shipping Fee"} value={"$" + shippingFee.toFixed(2)} />
                            <Divider />
                            <TextDetail label={"Total"} value={"$" + total.toFixed(2).toLocaleString()} />
                            <PrimaryButton label={"Confirm Oeder"} onClick={order}/>
                </div>
            </div>
        </section>
    )
}

export default OrderConfirm