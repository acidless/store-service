import {createSlice} from "@reduxjs/toolkit";

export type Product = {
    title: string;
    price: number;
    category: string;
    rating: {
        rate: number;
    }
}

export type ProductsState = {
    products: Product[];
}

const initialState: ProductsState = {
    products: []
};

export const productsSlice = createSlice({
   name: "products",
   initialState,
   reducers: {

   }
});

export const productsReducer = productsSlice.reducer;