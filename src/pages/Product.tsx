import {useGetProductQuery} from "../store/products/productsAPI.ts";
import {useParams} from "react-router";
import {useContext, useEffect} from "react";
import ErrorContext from "../context.tsx";
import Loader from "../components/Loader/Loader.tsx";
import ProductRating from "../components/ProductRating.tsx";

function Product() {
    const params = useParams();
    const {data, isLoading, isError} = useGetProductQuery(params.id!);

    const {setError} = useContext(ErrorContext);

    useEffect(() => {
        if (isError) {
            setError("There was an error while fetching products");
        }
    }, [isError]);

    if (isLoading) {
        return <Loader/>;
    }

    if (!data) {
        return <section>
            <p>Product not found</p>
        </section>;
    }

    return <section className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
            <img src={data.image} alt={data.title}/>
        </div>
        <div className="col-span-8">
            <div className="mb-2">
                <h1 className="text-4xl font-semibold mb-1">{data.title}</h1>
                <p className="text-neutral-500">{data.category}</p>
            </div>
            <div className="mb-6">
                <p className="text-3xl font-semibold">${data.price}</p>
            </div>
            <div className="mb-6">
                <p className="text-lg text-neutral-500">{data.description}</p>
            </div>
            <div>
                <ProductRating rating={data.rating?.rate}/>
            </div>
        </div>
    </section>
}

export default Product;