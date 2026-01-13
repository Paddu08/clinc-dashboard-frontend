import { DataTable } from "./notes/data-table"
import MyForm from "./form/noteform"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  return (
      <div className="flex min-h-svh items-center justify-center bg-muted p-6">
        <div className="w-full max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl text-center">
                Clinic Dashboard
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              <div>
                <DataTable />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Add New Note</h3>
                <MyForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default App
