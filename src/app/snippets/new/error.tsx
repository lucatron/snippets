'use client'

interface ErrorPageprops {
    error: Error,
    reset: () => void;
}
export default function ErrorPage({ error }: ErrorPageprops) {
    return <div>{error.message}</div>

}