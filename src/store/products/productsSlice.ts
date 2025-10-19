import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

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
       setProducts: (state, action: PayloadAction<Product[]>) => {
           state.products = action.payload;
       },
   }
});

export const { setProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;