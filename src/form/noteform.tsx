import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import formSchema from "./schema"

import { useMutation } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {postData} from "@/api/Api.tsx";
import type {CreateNotePayload} from "@/types/types.ts";

export default function MyForm() {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
    },
  })

  const mutation = useMutation({
    mutationFn: (data:CreateNotePayload) =>
        postData(data)
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.status === "Submitted") {
      setConfirmOpen(true)
      return
    }

    mutation.mutate(values)
    form.reset()
  }

  return (
    <div>
    <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit this record?</AlertDialogTitle>
            <AlertDialogDescription>
              This note is being marked as <b>Submitted</b>. After submission, it
              should not normally be modified because it may be used for billing,
              compliance, or audit purposes. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction
            type="button"
              onClick={() => {
                const values = form.getValues()
                mutation.mutate(values)
                setConfirmOpen(false)
              }}
            >
              Yes, Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    <Form {...form}>
      <Toaster />

      {/* Confirmation dialog */}
      
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 grid-cols-2 py-8"
      >
        <Field>
          <FieldLabel htmlFor="patient">Patient Name</FieldLabel>
          <Input
              id="patient_name"
              placeholder="Patient Name"
              {...form.register("patient_name")}
          />
          <FieldError>{form.formState.errors.patient_name?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="date">Date</FieldLabel>
          <Input
            id="date"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...form.register("date")}
          />
          <FieldError>{form.formState.errors.date?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="summary">Summary</FieldLabel>
          <Textarea id="summary" {...form.register("summary")} />
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
                  <SelectValue placeholder="Select status" />
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

        <div className="col-span-2 flex justify-center pt-6">
    <Button type="submit" size="lg">
      Submit
    </Button>
  </div>
      </form>
    </Form>
    </div>
  )
}
