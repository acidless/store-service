import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Product} from "./productsSlice.ts";

export const productsAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com/"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => "products",
            transformResponse: (response: Product[]) => {
                return response.map((item) => ({
                    ...item,
                    category: item.category[0].toUpperCase() + item.category.slice(1)
                }));
            },
        }),

        getCategories: builder.query<string[], void>({
            query: () => "products/categories",
            transformResponse: (response: string[]) => {
                return response.map((item) => item[0].toUpperCase() + item.slice(1));
            },
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

export const {useGetProductsQuery, useGetCategoriesQuery, useAddProductMutation} = productsAPI;