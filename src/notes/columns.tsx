import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import ActionsCell from "@/notes/action-cell.tsx";
import type {Patient} from "@/types/types.ts";





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
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
        <ActionsCell rowData={row.original} />
    ),

  },
   


  
]