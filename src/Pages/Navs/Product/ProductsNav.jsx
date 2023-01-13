import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ProductTemp from './ProductTemp';
import { useProducts } from '../../../Hooks/useProducts';



export const ProductsNav = ({wsId}) => {
    const { products } = useProducts(wsId);


    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    All Products
                </ListSubheader>
            }
        >

            {products && products.map((product, index) => {
                return <ProductTemp key={index} product={product} />
            })}

        </List>
    );
};

export default ProductsNav;
