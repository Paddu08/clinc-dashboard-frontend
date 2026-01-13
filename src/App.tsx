import { DataTable } from "./notes/data-table"
import { columns } from "./notes/columns"
import MyForm from "./form/noteform"
import { useQuery } from "@tanstack/react-query"

import { Spinner } from "@/components/ui/spinner"
import {
  Card,
  
  CardContent,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const API_BASE = import.meta.env.VITE_API_BASE_URL;




function App() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['patient'],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${API_BASE}/api/v1/notes`,
        )

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        return await response.json()
      } catch (error) {
        
        console.error("Fetch notes failed:", error)

        
        throw error instanceof Error
          ? error
          : new Error("Unknown error while fetching notes")
      }
    }
    ,
  })
  console.log(error)


  // if (error) return 'An error has occurred: ' + error.message



 return (
  <div className="flex min-h-svh items-center justify-center bg-muted p-6">
    {error ? (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error.message}</p>
        </CardContent>
      </Card>
    ) : isPending || isFetching ? (
      <Card className="w-full max-w-sm flex flex-col items-center justify-center py-10">
        <Spinner className="size-8 mb-4" />
        Loading...
      </Card>
    ) : (
      <div className="w-full max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl text-center">
              Clinic Dashboard
            </CardTitle>
           
          </CardHeader>

          <CardContent className="space-y-8">
            <div>
              <DataTable columns={columns} data={data} />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Add New Note</h3>
              <MyForm />
            </div>
          </CardContent>
        </Card>
      </div>
    )}
  </div>
)
}
export default App