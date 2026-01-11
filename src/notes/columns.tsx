import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"


type Patient = {
  id: string
 
  status: "Draft" | "Reviewed" | "Submitted" 
  date:string
  summary: string
  patient:string

}
export const patients: Patient[] = [
  {
     id: "728ed52",
     patient: "John Smith",
    summary:"test",
   
    
    date: new Date("2026-01-09").toLocaleString(),
    status: "Draft",
   
  },
  {
    id: "728ed524f",
     patient: "Maria Lee",
    summary:"test",
   
    date: new Date("2026-01-08").toLocaleString(),
    status: "Submitted",
   
  },
  
  // ...
]






export const columns: ColumnDef<Patient>[] = [
  
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
  },

  {
    accessorKey: "summary",
      header: "Summary"
  },
   


  
]