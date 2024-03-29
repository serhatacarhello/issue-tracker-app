"use client"
import { Button, Callout, TextField, } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { ErrorMessage, Spinner } from '@/app/components';
import { Issue } from '@prisma/client';
import "easymde/dist/easymde.min.css";

type IssueForm = z.infer<typeof issueSchema>

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

export default async function IssueForm({ issue }: { issue?: Issue }) {

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<IssueForm>({
        resolver: zodResolver(issueSchema)
    })
    const router = useRouter()
    const [error, setError] = useState("")

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data);
            }

            else await axios.post("/api/issues", data)
            router.push("/issues/list")
            router.refresh()
        } catch (error) {
            setError("An unexpected error has occurred.")
        }
    })
    return (
      <div className="max-w-xl ">
        {error && (
          <Callout.Root color="red" className="mb-3">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <form className="space-y-3" onSubmit={onSubmit}>
          <TextField.Root>
            <TextField.Input
              defaultValue={issue?.title}
              placeholder="Title"
              {...register("title")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message} </ErrorMessage>

          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message} </ErrorMessage>
          <Button ml={"auto"} disabled={isSubmitting}>
            {" "}
            {issue ? "Update Issue" : "Submit New Issue"}{" "}
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </div>
    );
}

