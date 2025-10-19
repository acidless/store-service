import type {Product} from "../store/products/productsSlice.ts";
import {Link} from "react-router";

type Props = {
    product: Product;
}

const ProductCard = function ({product}: Props) {
    return <div className="border-1 border-gray-300 p-4 rounded-xl flex flex-col">
        <div className="h-48 mb-4">
            <Link className="h-full w-full flex justify-center items-center" to={`/products/${product.id}`}>
                <img className="h-full w-auto select-none" src={product.image} alt={product.title}/>
            </Link>
        </div>
        <div className="mb-2">
            <h2 className="text-xl font-semibold line-clamp-1 -mb-1">
                <Link to={`/products/${product.id}`}>
                    {product.title}
                </Link>
            </h2>
            <p className="text-md text-neutral-500">{product.category}</p>
        </div>
        <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">${product.price}</p>
            {product.rating
                ? <div className="flex items-center">
                    <p className="text-lg mr-2">{product.rating.rate}</p>
                    <div className="w-7 h-7 p-1.5 rounded-sm bg-amber-500 select-none">
                        <img src="/star.svg" alt=""/>
                    </div>
                </div>
                : ""}
        </div>
    </div>;
}

export default ProductCard;