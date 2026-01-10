import { DataTable } from "./notes/data-table"
import { patients,columns } from "./notes/columns"


function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
     
      <DataTable columns={columns} data={patients}/>
    </div>
  )
}

export default App