
"use client"
import { Button, Callout, TextField, } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { ErrorMessage, Spinner } from '@/app/components';
import delay from "delay"
type IssueForm = z.infer<typeof createIssueSchema>

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

export default async function NewIssuePage() {


    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const router = useRouter()
    const [error, setError] = useState("")

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axios.post("/api/issues", data)
            router.push("/issues")
        } catch (error) {
            setError("An unexpected error has occurred.")
        }
    })
    await delay(500)
    return (
        <div className="max-w-xl ">
            {error && <Callout.Root color='red' className='mb-3'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register("title")} />
                </TextField.Root>
                <ErrorMessage  >{errors.title?.message} </ErrorMessage>
                <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder='Description' {...field} />} />
                <ErrorMessage >{errors.description?.message} </ErrorMessage>
                <Button ml={"auto"} disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>

            </form ></div >
    )
}
