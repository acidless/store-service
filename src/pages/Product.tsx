import {useGetProductQuery} from "../store/products/productsAPI.ts";
import {useParams} from "react-router";
import Loader from "../components/Loader/Loader.tsx";
import ProductRating from "../components/ProductRating.tsx";
import {useSelector} from "react-redux";
import type {State} from "../store/store.ts";

function Product() {
    const {id} = useParams();

    const localProduct = useSelector((state: State) =>
        state.products.products.find((p) => String(p.id) === id)
    );

    const { data, isLoading } = useGetProductQuery(id!, {
        skip: !!localProduct,
    });
    const product = localProduct || data;

    if (isLoading) {
        return <Loader/>;
    }

    if (!product) {
        return <section>
            <p>Product not found</p>
        </section>;
    }

    return <section className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
            <img src={product.image} alt={product.title}/>
        </div>
        <div className="col-span-8">
            <div className="mb-2">
                <h1 className="text-4xl font-semibold mb-1">{product.title}</h1>
                <p className="text-neutral-500">{product.category}</p>
            </div>
            <div className="mb-6">
                <p className="text-3xl font-semibold">${product.price}</p>
            </div>
            <div className="mb-6">
                <p className="text-lg text-neutral-500">{product.description}</p>
            </div>
            <div>
                <ProductRating rating={product.rating?.rate}/>
            </div>
        </div>
    </section>
}

export default Product;