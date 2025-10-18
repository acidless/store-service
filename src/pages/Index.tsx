import {useGetProductsQuery} from "../store/products/productsAPI.ts";
import Loader from "../components/Loader/Loader.tsx";
import ProductCard from "../components/ProductCard.tsx";

function Index() {
    const {data, error, isLoading} = useGetProductsQuery();

    console.log(data);

    if (isLoading) {
        return <Loader/>;
    }

    if(error) {
        return <p>Error</p>;
    }

    return <section>
        <h1>Home</h1>
        <div className="grid grid-cols-4 gap-4">
            {data && data.map((product) => (<ProductCard key={product.id} product={product}/>))}
        </div>
    </section>
}

export default Index;