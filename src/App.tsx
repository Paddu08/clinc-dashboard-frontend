import { DataTable } from "./notes/data-table"
import { columns } from "./notes/columns"
import MyForm from "./form/noteform"
import { useQuery } from "@tanstack/react-query"

import { Spinner } from "@/components/ui/spinner"







function App() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['patient'],
    queryFn: async () => {
      const response = await fetch(
        `https://${import.meta.env.VITE_MOCKAPI_SECRET}.mockapi.io/api/v1/note`,
      )
      return await response.json()
    },
  })
  console.log(data)


  if (error) return 'An error has occurred: ' + error.message


  return (
    
      (isPending|| isFetching)?(
        <div  className = "flex min-h-svh flex-col items-center justify-center"> <Spinner className="size-8" /> Loading</div>
      )
        : (
          <div className = "flex min-h-svh flex-col items-center justify-center">
            <div className="py-2"><h2 className="text-4xl">Clinic Dashboard</h2></div>
     
      <DataTable columns = { columns } data = { data }/>
    <MyForm />
      
    </div >
    )

  )
}

export default App