'use server';

import { redirect } from 'next/navigation';
import { db } from '@/app/db';
import { revalidatePath } from 'next/cache';

export async function editSnippet(id: number, code: string) {

    await db.snippet.update({
        where: { id },
        data: { code },
    });
    revalidatePath(`/snippets/${id}`)
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {

    await db.snippet.delete({
        where: { id }
    }
    );
    revalidatePath('/');
    redirect('/');
}
export async function createSnippet(formState: { message: string }, formData: FormData) {


    //Check the user's input and make sure they are valid
    try {
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;


        if (typeof title !== 'string' || title.length < 3) {
            return {
                message: 'Title too short'
            };
        }
        if (typeof code !== 'string' || code.length < 10) {
            return {
                message: 'Code too short'
            };
        }
        //    Create a new record in the database
        await db.snippet.create({
            data: {
                tilte: title,
                code: code,
            }
        });


    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message
            }
        }
        else {
            return {
                message: 'Something went wrong...'
            }

        }

    }
    //Redirect the user back to the root route
    revalidatePath('/')
    redirect('/');

}