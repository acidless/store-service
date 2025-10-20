import {useForm} from "react-hook-form";
import AccentButton from "./Buttons/AccentButton.tsx";
import SecondaryButton from "./Buttons/SecondaryButton.tsx";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useGetCategoriesQuery} from "../store/products/productsAPI.ts";
import Loader from "./Loader/Loader.tsx";
import {useEffect, useMemo} from "react";
import Select from "./Select.tsx";
import type {Product} from "../store/products/productsSlice.ts";

type Inputs = {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

type Props = {
    title: string;
    product?: Product;
    onCancel: () => void;
    onSubmit: (data: Inputs) => void;
    isLoading: boolean;
}

const schema = yup
    .object({
        title: yup.string().required().min(3).max(256),
        price: yup.number().round("round").typeError("should be a number").required().min(0),
        description: yup.string().required().max(4096),
        category: yup.string().required(),
        image: yup.string().required(),
    })
    .required();

const EditProductForm = function ({title, onCancel, onSubmit, product, isLoading}: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm<Inputs>({resolver: yupResolver(schema)});

    const {data} = useGetCategoriesQuery();

    const options = useMemo(() => {
        return data ? data.map((category) => ({key: category.toLowerCase(), text: category})) : [];
    }, [data]);

    useEffect(() => {
        if (data && !getValues().category) {
            setValue("category", product?.category || data[0]);
        }
    }, [data, product]);

    function onCategoryChange(category: string) {
        setValue("category", category);
    }

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl font-semibold text-center mb-6">{title}</h2>
            <div className="flex flex-col mb-2 text-base">
                <label className="mb-1" htmlFor="title">Title</label>
                <input className="border-1 border-gray-300 py-1 px-2 rounded-md" id="title" type="text" {...register(
                    "title", {value: product?.title})}/>
                <p className="mt-1 text-red-500 text-sm">{errors.title?.message}</p>
            </div>
            <div className="flex flex-col mb-2 text-base">
                <label className="mb-1" htmlFor="price">Price</label>
                <input className="border-1 border-gray-300 py-1 px-2 rounded-md" id="price" type="number" step="0.01" {...register(
                    "price", {value: product?.price})}/>
                <p className="mt-1 text-red-500 text-sm">{errors.price?.message}</p>
            </div>
            <div className="flex flex-col mb-2 text-base">
                <label className="mb-1" htmlFor="description">Description</label>
                <textarea className="border-1 border-gray-300 py-1 px-2 rounded-md" id="description" {...register(
                    "description", {value: product?.description})}/>
                <p className="mt-1 text-red-500 text-sm">{errors.description?.message}</p>
            </div>
            <div className="flex flex-col mb-2 text-base">
                <label className="mb-1" htmlFor="image">Image URL</label>
                <input className="border-1 border-gray-300 py-1 px-2 rounded-md" id="image" {...register("image", {value: product?.image})}/>
                <p className="mt-1 text-red-500 text-sm">{errors.image?.message}</p>
            </div>
            <div className="flex flex-col mb-8 text-base">
                <label className="mb-1" htmlFor="category">Category</label>
                <Select align="left" onOptionChange={onCategoryChange}
                        options={options} defaultOption={product?.category ? options.findIndex(o => o.text === product?.category) : 0}/>
                <p className="mt-1 text-red-500 text-sm">{errors.category?.message}</p>
            </div>
            <div className="flex items-stretch gap-2">
                <SecondaryButton onClick={onCancel} className="flex-1">Cancel</SecondaryButton>
                <AccentButton disabled={isLoading} className="flex-1">Submit</AccentButton>
            </div>
            {isLoading && <div className="mt-2">
                <Loader/>
            </div>}
        </form>
    </div>
}

export default EditProductForm;