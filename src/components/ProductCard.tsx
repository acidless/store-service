import type {Product} from "../store/products/productsSlice.ts";

type Props = {
    product: Product;
}

const ProductCard = function ({product}: Props) {
    return <div className="border-1 border-gray-300 p-4 rounded-xl flex flex-col">
        <div className="h-48 flex justify-center items-center mb-4">
            <img className="h-full w-auto select-none" src={product.image} alt={product.title}/>
        </div>
        <div className="mb-2 line-clamp-1">
            <h2 className="text-xl font-semibold">{product.title}</h2>
        </div>
        <div className="max-h-18 overflow-hidden flex-1 mb-4">
            <p className="text-base line-clamp-3 overflow-hidden text-neutral-500">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">${product.price}</p>
            {product.rating
                ?   <div className="flex items-center">
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