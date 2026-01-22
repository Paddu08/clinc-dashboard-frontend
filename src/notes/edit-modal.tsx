import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import type {Patient, UpdateNotePayload} from "@/types/types.ts";

type EditNoteModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData: Patient
    onSubmit: (data: UpdateNotePayload) => void
    isSubmitting: boolean
}

export function EditNoteModal({
                                  open,
                                  onOpenChange,
                                  initialData,
                                  onSubmit,
                                  isSubmitting,
                              }: EditNoteModalProps) {
    const form = useForm({
        defaultValues: initialData,
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <Input {...form.register("patient_name")} />
                    <Input {...form.register("date")} />
                    <Textarea {...form.register("summary")} />

                    <Button type="submit" disabled={isSubmitting}>
                        Save changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
