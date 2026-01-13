import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"



type Patient = {
  id: string
 
  status: "Draft" | "Reviewed" | "Submitted" 
  date:string
  summary: string
  patient:string

}







export const columns: ColumnDef<Patient>[] = [{
  accessorKey:"id",
  header: ({ column }) => {

    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )}
},
  
    {

    accessorKey: "patient",
       header: ({ column }) => {
        
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  
 
  {
    accessorKey: "date",
        header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
        header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (info) => {
  const statusValue = info.getValue<string>()

  let bgColor = "" // default fallback

  switch (statusValue) {
    case "Draft":
      bgColor = "bg-yellow-600"
      break
    case "Reviewed":
      bgColor = "bg-green-600"
      break
    case "Submitted":
      bgColor = "bg-blue-600"
      break
  }

  return (
    <Badge  variant="outline" className={`${bgColor} w-20  text-white`}>
      {statusValue}
    </Badge>
  )
}
  },

  {
    accessorKey: "summary",
      header: "Summary"
  },
   


  
]