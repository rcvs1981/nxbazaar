import CustomDataTable from "@/components/backoffice/CustomDataTable";
import DashboardCharts from "@/components/backoffice/DashboardCharts";
import Heading from "@/components/backoffice/Heading";
 
import LargeCards from "@/components/backoffice/LargeCards";
import SmallCards from "@/components/backoffice/SmallCards";
//import { getData } from "@/lib/getData";
import React from "react";


export default async function page() {
  

  return (
    <div>
      <Heading title="Dashboard Overview" />
      <LargeCards  />
      <SmallCards  />
      <DashboardCharts />
      <CustomDataTable />
    </div>
  );
}
