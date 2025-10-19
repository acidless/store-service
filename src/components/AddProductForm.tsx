import {type SubmitHandler, useForm} from "react-hook-form";
import AccentButton from "./Buttons/AccentButton.tsx";
import SecondaryButton from "./Buttons/SecondaryButton.tsx";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAddProductMutation} from "../store/products/productsAPI.ts";
import Loader from "./Loader/Loader.tsx";
import {useEffect} from "react";

type Inputs = {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

type Props = {
    onCancel: () => void;
    onSuccess: () => void;
}

const schema = yup
    .object({
        title: yup.string().required().min(3).max(256),
        price: yup.number().typeError("should be a number").required().min(0),
        description: yup.string().required().max(4096),
        category: yup.string().required(),
        image: yup.string().required(),
    })
    .required();

const AddProductForm = function ({onCancel, onSuccess}: Props) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>({resolver: yupResolver(schema)});

    const [addProduct, result] = useAddProductMutation();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        addProduct(data);
    }

    useEffect(() => {
        onSuccess();
    }, [result.isSuccess]);

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl font-semibold text-center mb-6">Add product</h2>
            <div className="flex flex-col mb-2 text-base">
                <label className="mb-1" htmlFor="title">Title</label>
                <input className="border-1 border-gray-300 py-1 px-2 rounded-md" id="title" type="text" {...register(
                    "title")}/>
                <p className="mt-1 text-red-500 text-sm">{errors.title?.message}</p>
            </div>
            <div className="flex flex-col mb-2 text-base">
                <label className="mb-1" htmlFor="price">Price</label>
                <input className="border-1 border-gray-300 py-1 px-2 rounded-md" id="price" type="number" {...register(
                    "price")}/>
                <p className="mt-1 text-red-500 text-sm">{errors.price?.message}</p>
            </div>
            <div className="flex flex-col mb-2 text-base">
                <label className="mb-1" htmlFor="description">Description</label>
                <textarea className="border-1 border-gray-300 py-1 px-2 rounded-md" id="description" {...register(
                    "description")}/>
                <p className="mt-1 text-red-500 text-sm">{errors.description?.message}</p>
            </div>
            <div className="flex flex-col mb-2 text-base">
                <label className="mb-1" htmlFor="image">Image URL</label>
                <input className="border-1 border-gray-300 py-1 px-2 rounded-md" id="image" {...register("image")}/>
                <p className="mt-1 text-red-500 text-sm">{errors.image?.message}</p>
            </div>
            <div className="flex flex-col mb-8 text-base">
                <label className="mb-1" htmlFor="category">Category</label>
                <input className="border-1 border-gray-300 py-1 px-2 rounded-md" id="category" {...register(
                    "category")}/>
                <p className="mt-1 text-red-500 text-sm">{errors.category?.message}</p>
            </div>
            <div className="flex items-stretch gap-2">
                <SecondaryButton onClick={onCancel} className="flex-1">Cancel</SecondaryButton>
                <AccentButton disabled={result.isLoading} className="flex-1">Create</AccentButton>
            </div>
            {result.isLoading && <div className="mt-2">
                <Loader/>
            </div>}
        </form>
    </div>
}

export default AddProductForm;