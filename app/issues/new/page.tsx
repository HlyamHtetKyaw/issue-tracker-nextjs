'use client';

import { TextField,Button, Callout,Text } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import {useForm,Controller} from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '../../validationSchema';
import { set, z } from 'zod';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner  from '../../components/Spinner';
type IssueForm = z.infer<typeof createIssueSchema>;

// interface IssueForm{
//     title:string;
//     description:string;
// }
const NewIssuePage = () => {
    const router = useRouter();
    const {register,control,handleSubmit,formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error,setError] = useState('');
    const[isSubmitting,setSubmitting] = useState(false);

  return (
    <div className='max-w-xl'>
        {error && <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        <form className='space-y-3' onSubmit={handleSubmit(async (data)=>{
            try{
                setSubmitting(true);
                await axios.post('/api/issues',data);
                router.push('/issues');
            }catch(error){
                setSubmitting(false);
                setError('Failed to create issue. Please try again.');
            }
        })}>
            <TextField.Root placeholder='Title' {...register('title')}>
            </TextField.Root>
            {/* {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>} */}
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller name='description' control={control} render={({field})=><SimpleMDE placeholder="Description" {...field}/>}/>
            {/* {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>} */}
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
        </form>
    </div>
  )
}

export default NewIssuePage