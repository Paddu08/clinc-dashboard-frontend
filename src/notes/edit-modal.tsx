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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

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

                    <Input type="date" {...form.register("date")} />

                    <Textarea {...form.register("summary")} />

                    <Select
                        defaultValue={initialData.status}
                        onValueChange={(value) => form.setValue("status", value)}
                    >
                        <SelectTrigger>


                            <SelectValue placeholder="Select status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Reviewed">Reviewed</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Submitted">Submitted</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button type="submit" disabled={isSubmitting}>
                        Save changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
