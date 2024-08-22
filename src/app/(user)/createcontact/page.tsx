"use client"

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import ContactForm from "@/components/ui/contact-form";
import useHttp from "@/hooks/useHttp";
import { HttpResponseData, Contacts } from "../../../../shared/types";
import { HttpEnum } from "../../../../shared/enums";
import AuthContext from "@/store/auth-context";

const CreateContact = () => {
    const { isLoading, error, sendHttpRequest: createContactHttpRequest } = useHttp();

    const router = useRouter();

    const authContext = useContext(AuthContext);

    const { token } = authContext;

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);


    const createContactRequestResponse = (res: HttpResponseData) => {
        const { status } = res;

        if (status === HttpEnum.SUCCESS) {
            toast.success("Contact creation successful!");

            router.push("/contact")
        };
    }

    const handleFormSubmit = (formData: Contacts) => {
        const { firstName, lastName, phoneNumber } = formData;

        createContactHttpRequest({
            url: "contact",
            method: "POST",
            token,
            body: {
                firstName,
                lastName,
                phoneNumber
            }
        },
            createContactRequestResponse
        )


    }

    return <ContactForm title="Create Contact" isLoading={isLoading} handleFormSubmit={handleFormSubmit} />
}

export default CreateContact;