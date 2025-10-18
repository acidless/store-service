import type {Product} from "../store/products/productsSlice.ts";
import {useEffect, useState} from "react";

function useSortedProducts(data: Product[] | undefined, sort: string) {
    const [sortedData, setSortedData] = useState<Product[]>([]);

    useEffect(() => {
        if(!data) {
            setSortedData([]);
            return;
        }

        let compareFn: ((a: Product, b: Product) => number) | undefined = undefined;
        switch (sort) {
            case "price-asc":
                compareFn = (a, b) => a.price - b.price;
                break;
            case "price-desc":
                compareFn = (a, b) => b.price - a.price;
                break;
            case "rating":
                compareFn = (a, b) => b.rating.rate - a.rating.rate;
                break;
        }

        setSortedData([...data].sort(compareFn));
    }, [data, sort]);


    return sortedData;
}

export default useSortedProducts;