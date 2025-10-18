import {useGetProductsQuery} from "../store/products/productsAPI.ts";

function Index() {
    const {data, error, isLoading} = useGetProductsQuery();

    console.log(data);

    return (
      <div>
         <h1>Store</h1>
      </div>
   );
}

export default Index;