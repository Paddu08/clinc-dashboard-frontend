import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteData, updateData } from "@/api/Api"
import { EditNoteModal } from "./edit-modal.tsx"
import type {Patient} from "@/types/types.ts"

type ActionsCellProps = {
    rowData: Patient
}

export function ActionsCell({ rowData }: ActionsCellProps) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
        },
    })

    const updateMutation = useMutation({
        mutationFn: updateData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
            setOpen(false)
        },
    })


    return (
        <>
            <div className="flex gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setOpen(true)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteMutation.mutate(parseInt(rowData.id))}
                    disabled={deleteMutation.isPending}
                >
                    <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
            </div>

            <EditNoteModal
                open={open}
                onOpenChange={setOpen}
                initialData={rowData}
                onSubmit={(values) =>
                    updateMutation.mutate({
                        id:parseInt( rowData.id),
                        data: values,
                    })
                }
                isSubmitting={updateMutation.isPending}
            />
        </>
    )
}
export default ActionsCell