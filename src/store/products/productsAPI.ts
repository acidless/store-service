import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Product} from "./productsSlice.ts";

export const productsAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com/"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => "products"
        }),
        addProduct: builder.mutation<Product, Partial<Product>>({
            query: (product) => ({
                url: "products",
                method: "POST",
                body: product
            }),

            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data: createdProduct} = await queryFulfilled;

                    dispatch(productsAPI.util.updateQueryData(
                            "getProducts",
                            undefined,
                            (draft) => {
                                draft.push(createdProduct);
                            }
                        )
                    );
                } catch (e) {
                    console.error(e);
                }
            },
        })
    })
});

export const {useGetProductsQuery, useAddProductMutation} = productsAPI;