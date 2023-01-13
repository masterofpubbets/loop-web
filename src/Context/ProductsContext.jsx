import React, { createContext, useReducer } from "react";

const types = {
    GETPRODUCTS: 'GETPRODUCTS'
};

export const ProductContext = createContext();

const ProductReducer = (state, action) => {
    switch (action.type) {
        case types.GETPRODUCTS:
            return ({ ...state, products: action.payload, dataVersion: state.dataVersion + 1 });
        default:
            return { ...state }
    }
};


export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, { products: [], dataVersion: 0 })
    
    const getProducts = (products) => {
        dispatch({type: types.GETPRODUCTS, payload: products})
    };
    

    return (
        <ProductContext.Provider value={{ ...state, getProducts }}>
            {children}
        </ProductContext.Provider>
    )

};