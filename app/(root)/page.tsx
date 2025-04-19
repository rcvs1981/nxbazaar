
import { Metadata } from "next";
import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/products/product-list";



export const metadata: Metadata = {
    title: "Home"
};
const delay =(ms:number) => new Promise((resolve)=>setTimeout(resolve,ms));
const HomePage = async () => {
    await delay(1000);
    //console.log(sampleData);
    return (
        <>
        <ProductList data={sampleData.products} title='Latest Arrivals' />
        </>
    );
}

export default HomePage;