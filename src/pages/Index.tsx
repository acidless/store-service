import {useGetProductsQuery} from "../store/products/productsAPI.ts";
import Loader from "../components/Loader/Loader.tsx";
import ProductCard from "../components/ProductCard.tsx";
import Sort from "../components/Sort/Sort.tsx";
import useSortedProducts from "../hooks/useSortedProducts.ts";
import {useState} from "react";

function Index() {
    const {data, error, isLoading} = useGetProductsQuery();
    const [sortKey, setSortKey] = useState("");
    const sortedData = useSortedProducts(data, sortKey);

    function onChangeSorting(newKey: string) {
        setSortKey(newKey);
    }

    if (isLoading) {
        return <Loader/>;
    }

    if(error) {
        return <p>Error</p>;
    }

    return <section>
        <h1>Home</h1>
        <div className="flex justify-end items-center mb-4">
            <Sort onSortChange={onChangeSorting}/>
        </div>
        <div className="grid grid-cols-4 gap-4">
            {sortedData.map((product) => (<ProductCard key={product.id} product={product}/>))}
        </div>
    </section>
}

export default Index;