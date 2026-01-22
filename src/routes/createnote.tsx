import { createFileRoute } from '@tanstack/react-router'
import MyForm from "@/form/noteform.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

export const Route = createFileRoute('/createnote')({
    component: About,
})
function About() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 sm:px-6">
            <Card className="w-full max-w-5xl sm:max-w-1sm">
                <CardContent className="space-y-6 p-6 sm:p-8">
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">
                            Add New Note
                        </h3>
                        <MyForm />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
