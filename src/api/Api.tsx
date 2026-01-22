import * as Types from "../types/types.ts"
import type {Writeable} from "zod/v3";
import type {ZodISODate} from "zod";
import type {$strip} from "zod/v4/core";
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

export const postData = async (data: output<ZodObject<Writeable<{
    patient: ZodString;
    date: ZodISODate;
    status: ZodEnum<ToEnum<readonly ["Draft", "Reviewed", "Submitted"][number]>>;
    summary: ZodString
}>, $strip>>) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`,
        {
            method: "POST",
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








