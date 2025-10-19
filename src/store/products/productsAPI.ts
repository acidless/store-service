import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Product} from "./productsSlice.ts";

function capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
}

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
                    category: capitalize(item.category)
                }));
            },
        }),

        getProduct: builder.query<Product, string>({
            query: (id: string) => `products/${id}`,
            transformResponse: (response: Product) => {
                response.category = capitalize(response.category);
                return response;
            },
        }),

        getCategories: builder.query<string[], void>({
            query: () => "products/categories",
            transformResponse: (response: string[]) => {
                return response.map((item) => capitalize(item));
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

export const {useGetProductsQuery, useGetCategoriesQuery, useGetProductQuery, useAddProductMutation} = productsAPI;