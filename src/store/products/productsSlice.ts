import {createSlice} from "@reduxjs/toolkit";

export type Product = {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    rating?: {
        rate: number;
    }
}

export type ProductsState = {
    products: Product[];
    categories: string[];
}

const initialState: ProductsState = {
    products: [],
    categories: []
};

export const productsSlice = createSlice({
   name: "products",
   initialState,
   reducers: {

   }
});

export const productsReducer = productsSlice.reducer;