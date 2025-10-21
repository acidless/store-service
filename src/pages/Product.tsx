import {useGetProductQuery, useUpdateProductMutation} from "../store/products/productsAPI.ts";
import {useParams, useNavigate} from "react-router";
import Loader from "../components/Loader/Loader.tsx";
import ProductRating from "../components/ProductRating.tsx";
import {useSelector} from "react-redux";
import type {State} from "../store/store.ts";
import {useContext, useEffect, useState} from "react";
import ModalWindow from "../components/ModalWindow.tsx";
import DeleteProduct from "../components/DeleteProduct.tsx";
import EditProductForm from "../components/EditProductForm.tsx";
import ErrorContext from "../context.tsx";

function Product() {
    const [isDeleteProductModalActive, setDeleteProductModalActive] = useState(false);
    const [isEditProductModalActive, setEditProductModalActive] = useState(false);
    const {id} = useParams();

    const localProduct = useSelector((state: State) =>
        state.products.products.find((p) => String(p.id) === id)
    );
    const navigate = useNavigate();
    const {setError} = useContext(ErrorContext);
    const [updateProduct, updateResult] = useUpdateProductMutation();
    const {data, isLoading} = useGetProductQuery(id!, {
        skip: !!localProduct,
    });
    const product = localProduct || data;

    useEffect(() => {
        if (updateResult.isError) {
            setError("There was an error while updating product");
        }
    }, [updateResult.isError]);

    useEffect(() => {
        if (updateResult.isSuccess) {
            setEditProductModalActive(false);
        }
    }, [updateResult.isSuccess]);

    function onSuccessfulDelete() {
        navigate("/");
    }

    if (isLoading) {
        return <Loader/>;
    }

    if (!product) {
        return <section>
            <p>Product not found</p>
        </section>;
    }

    return <section className="grid grid-cols-1 justify-items-center md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
            <img src={product.image} alt={product.title}/>
        </div>
        <div className="md:col-span-8">
            <div className="flex justify-start gap-1 mb-2">
                <button onClick={() => setEditProductModalActive(true)}
                        className="cursor-pointer hover:rotate-12 transition-all duration-300"
                        aria-label="Edit product">
                    <img className="w-6" src="/edit.svg" alt=""/>
                </button>
                <button onClick={() => setDeleteProductModalActive(true)}
                        className="cursor-pointer hover:rotate-12 transition-all duration-300"
                        aria-label="Delete product">
                    <img className="w-7" src="/delete.svg" alt=""/>
                </button>
            </div>
            <div className="mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-1">{product.title}</h1>
                <p className="text-neutral-500">{product.category}</p>
            </div>
            <div className="mb-6">
                <p className="text-2xl md:text-3xl font-semibold">${product.price}</p>
            </div>
            <div className="mb-6">
                <p className="text-base md:text-lg text-neutral-500">{product.description}</p>
            </div>
            <div>
                <ProductRating rating={product.rating?.rate}/>
            </div>
        </div>
        <ModalWindow isOpened={isEditProductModalActive} setOpened={setEditProductModalActive}>
            <EditProductForm title="Edit product" product={product} isLoading={false}
                             onCancel={() => setDeleteProductModalActive(false)}
                             onSubmit={(data) => updateProduct({id: id!, product: data})}/>
        </ModalWindow>
        <ModalWindow isOpened={isDeleteProductModalActive} setOpened={setDeleteProductModalActive}>
            <DeleteProduct onCancel={() => setDeleteProductModalActive(false)}
                           onDelete={onSuccessfulDelete}/>
        </ModalWindow>
    </section>
}

export default Product;