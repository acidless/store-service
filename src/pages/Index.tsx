import {useGetProductsQuery} from "../store/products/productsAPI.ts";
import Loader from "../components/Loader/Loader.tsx";
import ProductCard from "../components/ProductCard.tsx";
import Sort from "../components/Sort/Sort.tsx";
import useSortedProducts from "../hooks/useSortedProducts.ts";
import {useState} from "react";
import AccentButton from "../components/Buttons/AccentButton.tsx";
import ModalWindow from "../components/ModalWindow.tsx";
import AddProductForm from "../components/AddProductForm.tsx";

function Index() {
    const {data, error, isLoading} = useGetProductsQuery();

    const [sortKey, setSortKey] = useState("");
    const sortedData = useSortedProducts(data, sortKey);

    const [productCreateModalActive, setProductCreateModalActive] = useState(false);


    function onChangeSorting(newKey: string) {
        setSortKey(newKey);
    }

    if (isLoading) {
        return <Loader/>;
    }

    if (error) {
        return <p>Error</p>;
    }

    return <section>
        <h1>Catalog</h1>
        <div className="flex justify-between items-center mb-4">
            <AccentButton onClick={() => setProductCreateModalActive(true)}>Add product</AccentButton>
            <Sort onSortChange={onChangeSorting}/>
        </div>
        <div className="grid grid-cols-4 gap-4">
            {sortedData.map((product) => (<ProductCard key={product.id} product={product}/>))}
        </div>
        <ModalWindow isOpened={productCreateModalActive} setOpened={setProductCreateModalActive}>
            <AddProductForm onCancel={() => setProductCreateModalActive(false)}/>
        </ModalWindow>
    </section>
}

export default Index;