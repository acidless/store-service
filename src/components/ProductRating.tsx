type Props = {
    rating?: number;
}

const ProductRating = function ({rating}: Props) {
    if (!rating) return <></>;

    return <div className="flex items-center">
        <p className="text-lg mr-2">{rating}</p>
        <div className="w-7 h-7 p-1.5 rounded-sm bg-amber-500 select-none">
            <img src="/star.svg" alt=""/>
        </div>
    </div>
}

export default ProductRating;