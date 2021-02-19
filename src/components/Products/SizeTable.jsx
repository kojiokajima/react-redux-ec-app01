import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
})

const SizeTable = (props) => {
    const classes = useStyles()

    const sizes = props.sizes

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {sizes.length > 0 && (
                        sizes.map(size => (
                            <TableRow key = {size.size}>
                                <TableCell component="th" scope="row">
                                    {size.size}
                                </TableCell>
                                <TableCell>
                                    Stock: {size.quantity}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    {size.quantity > 0 ? (
                                        <IconButton>
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : (
                                        <div>Sold Out</div>
                                    )}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    <IconButton>
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                    ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SizeTable