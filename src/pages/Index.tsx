import {useGetProductsQuery} from "../store/products/productsAPI.ts";
import Loader from "../components/Loader/Loader.tsx";
import ProductCard from "../components/ProductCard.tsx";
import useSortedProducts from "../hooks/useSortedProducts.ts";
import {useContext, useEffect, useState} from "react";
import AccentButton from "../components/Buttons/AccentButton.tsx";
import ModalWindow from "../components/ModalWindow.tsx";
import AddProductForm from "../components/AddProductForm.tsx";
import ErrorContext from "../context.tsx";
import Select from "../components/Select.tsx";

const sortingParams = [
    {key: "default", text: "Default sort"},
    {key: "price-asc", text: "Price: Low to High"},
    {key: "price-desc", text: "Price: High to Low"},
    {key: "rating", text: "Rating"},
];


function Index() {
    const {data, isError, isLoading} = useGetProductsQuery();

    const {setError} = useContext(ErrorContext);

    const [sortKey, setSortKey] = useState("");
    const sortedData = useSortedProducts(data, sortKey);

    const [productCreateModalActive, setProductCreateModalActive] = useState(false);

    useEffect(() => {
        if (isError) {
            setError("There was an error while fetching products");
        }
    }, [isError]);

    function closeModal() {
        setProductCreateModalActive(false);
    }

    function onChangeSorting(newKey: string) {
        setSortKey(newKey);
    }

    if (isLoading) {
        return <Loader/>;
    }

    return <section className="flex-1">
        <h1>Catalog</h1>
        <div className="flex justify-between items-center mb-4">
            <AccentButton onClick={() => setProductCreateModalActive(true)}>Add product</AccentButton>
            <Select options={sortingParams} onOptionChange={onChangeSorting}/>
        </div>
        <div className="grid grid-cols-4 gap-4 h-full">
            {sortedData.map((product) => (<ProductCard key={product.id} product={product}/>))}
        </div>
        <ModalWindow isOpened={productCreateModalActive} setOpened={setProductCreateModalActive}>
            <AddProductForm onCancel={closeModal} onSuccess={closeModal}/>
        </ModalWindow>
    </section>
}

export default Index;