import { ColumnDef } from "@tanstack/react-table"

export const columns:ColumnDef<any>[] = [

{
accessorKey:"hsnCode",
header:"HSN"
},

{
accessorKey:"description",
header:"Description"
},

{
accessorKey:"cgst",
header:"CGST"
},

{
accessorKey:"sgst",
header:"SGST"
},

{
accessorKey:"igst",
header:"IGST"
},

{
id:"actions",
header:"Actions"
}

]