import {db} from "@/lib/db";

export async function getProductOptions() {

  const categories = await db.category.findMany({
    select:{
      id:true,
      title:true
    }
  });

  const sellers = await db.user.findMany({
    where:{
      role:"SELLER"
    },
    select:{
      id:true,
      name:true
    }
  });

  

 

  const sellerOptions = sellers.map((s)=>({
    id:s.id,
    title:s.name
  }));

  

  return {
    categories,
    sellers:sellerOptions,
   
  };
}