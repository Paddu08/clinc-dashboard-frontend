export type CreateNotePayload ={
    patient_name: string
    date: string
    summary: string
    status: NoteStatus
}

export type UpdateNotePayload ={
    patient_name?: string
    date?: string
    summary?: string
    status?: NoteStatus
}
export type NoteStatus = "Draft" | "Reviewed" | "Submitted"
export type Note ={
    id: number
    patient_name: string
    date: string            // ISO string from backend
    summary: string
    status: NoteStatus
    created_at: string
    updated_at: string
}

export type Patient = {
    id: string

    status: "Draft" | "Reviewed" | "Submitted"
    date:string
    summary: string
    patient_name:string

}




