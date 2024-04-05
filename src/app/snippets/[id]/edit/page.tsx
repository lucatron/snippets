import { db } from "@/app/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEdtiPageProps {
    params: {
        id: string,
    }
}

export default async function SnippetEditPage(props: SnippetEdtiPageProps) {
    const id = parseInt(props.params.id);

    const snippet = await db.snippet.findFirst({
        where: { id }
    });
    if (!snippet) {
        return notFound();
    }

    return (<div>
        Editing snippet with title {snippet.tilte}
        <SnippetEditForm snippet={snippet} />

    </div>);
}