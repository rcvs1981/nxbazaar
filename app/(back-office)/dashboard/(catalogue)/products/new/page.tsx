import { getProductOptions } from "@/actions/getOptions";
import NewProductForm from "@/components/backoffice/NewProductForm";

export default async function NewProductPage(){

 const { categories, sellers} = await getProductOptions();

 return(

  <NewProductForm
   categories={categories}
   sellers={sellers}
   
   
  />

 )

}