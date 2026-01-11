import {
    useForm, Controller
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    z
} from "zod"
import { Form } from "@/components/ui/form"
import {
    toast
} from "sonner"
import {
    Field,
    FieldLabel,
    // FieldDescription  ,
    FieldError
} from "@/components/ui/field"
import {
    Button
} from "@/components/ui/button"
import {
    Input
} from "@/components/ui/input"
import {
    Textarea
} from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import formSchema from "./schema"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Toaster } from "@/components/ui/sonner"
import { useQueryClient } from "@tanstack/react-query"

export default function MyForm() {
    const queryClient= useQueryClient()



    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => {
            return axios.post(
                `https://${import.meta.env.VITE_MOCKAPI_SECRET}.mockapi.io/api/v1/note`,
                data
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patient"] })
            toast.success("Saved successfully")
            form.reset()
        },
        onError: () => {
            toast.error("Failed to save")
        },
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            "date": new Date().toISOString().slice(0, 10),
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate(values)

    }

    return (
        <Form {...form}>
            <Toaster />

            <form onSubmit={form.handleSubmit(onSubmit)} className="grid  gap-6 grid-cols-2   py-8">
                <Field>
                    <FieldLabel htmlFor="patient">Patient Name</FieldLabel>
                    <Input
                        id="patient"
                        placeholder="Patient Name"

                        {...form.register("patient")}
                    />

                    <FieldError>{form.formState.errors.patient?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel className="w-2xl" htmlFor="date">Date</FieldLabel>
                    <Input
                        id="date"
                        type="date"
                        min={new Date().toISOString().slice(0, 10)}
                        placeholder="Placeholder"
                        {...form.register("date")}
                    />

                    <FieldError>{form.formState.errors.date?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="summary">Summary</FieldLabel>
                    <Textarea
                        id="summary"
                        placeholder="Placeholder"

                        {...form.register("summary")}
                    />

                    <FieldError>{form.formState.errors.summary?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel>Status</FieldLabel>

                    <Controller
                        name="status"
                        control={form.control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Reviewed">Reviewed</SelectItem>
                                    <SelectItem value="Submitted">Submitted</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <FieldError>{form.formState.errors.status?.message}</FieldError>
                </Field>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}