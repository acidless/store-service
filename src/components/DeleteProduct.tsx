import SecondaryButton from "./Buttons/SecondaryButton.tsx";
import AccentButton from "./Buttons/AccentButton.tsx";
import Loader from "./Loader/Loader.tsx";
import {useDeleteProductMutation} from "../store/products/productsAPI.ts";
import {useParams} from "react-router";
import {useContext, useEffect} from "react";
import ErrorContext from "../context.tsx";

type Props = {
    onCancel: () => void;
    onDelete: () => void;
}

const DeleteProduct = function ({onCancel, onDelete}: Props) {
    const {setError} = useContext(ErrorContext);
    const [deleteProduct, result] = useDeleteProductMutation();
    const {id} = useParams();

    function deleteProductHandler() {
        deleteProduct(id!);
    }

    useEffect(() => {
        if(result.isSuccess) {
            onDelete();
        }
    }, [onDelete, result.isSuccess]);

    useEffect(() => {
        if(result.isError) {
            setError("There was an error while deleting product");
        }
    }, [result.isError]);

    return <div>
        <h2 className="text-3xl font-semibold text-center mb-6">Delete product</h2>
        <div className="mb-6 text-lg text-center">
            <p>Are you sure you want to delete this product?</p>
        </div>
        <div className="flex items-stretch gap-2">
            <SecondaryButton onClick={onCancel} className="flex-1">Cancel</SecondaryButton>
            <AccentButton onClick={deleteProductHandler} disabled={result.isLoading} className="flex-1">Delete</AccentButton>
        </div>
        {result.isLoading && <div className="mt-2">
            <Loader/>
        </div>}
    </div>
}

export default DeleteProduct;