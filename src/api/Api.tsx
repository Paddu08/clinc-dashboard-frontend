import * as Types from "../types/types.ts"

import type {Note} from "../types/types.ts";
export const getData = async (pagination: {
    pageIndex: number
    pageSize: number
}) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes?page=${
            pagination.pageIndex + 1
        }&limit=${pagination.pageSize}`
    )

    if (!res.ok) {
        throw new Error("Failed to fetch notes")
    }

    return res.json()
}


export const postData = async (
    data: Types.CreateNotePayload
): Promise<Note> => {
    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    )

    if (!res.ok) {
        throw new Error("Failed to save")
    }

    return res.json()
}



export const updateData = async ({id, data}:{
    id: number
    data: Types.UpdateNotePayload
}) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    )

    if (!res.ok) {
        throw new Error("Failed to save")
    }

    return res

}


export const deleteData = async (id: number) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
        {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
            },

        }
    )

    if (!res.ok) {
        throw new Error("Failed to save")
    }

    return res

}








