"use client";
import AddBookForm from "@/app/components/AddBookForm";

export default function EditBookPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Book</h1>
            <AddBookForm isEdit></AddBookForm>
        </>
    );
}
