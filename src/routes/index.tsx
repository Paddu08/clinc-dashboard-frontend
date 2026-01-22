import { createFileRoute } from '@tanstack/react-router'
import {DataTable} from "@/notes/data-table.tsx";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="flex min-h-screen justify-center px-4 sm:px-6">
            <div className="w-full max-w-5xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl sm:text-3xl lg:text-4xl text-center">
                            Clinic Dashboard
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Table wrapper for mobile */}
                        <div className="overflow-x-auto">
                            <DataTable />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
