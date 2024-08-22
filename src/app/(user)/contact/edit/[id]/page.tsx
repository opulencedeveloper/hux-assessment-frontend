"use client"

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { useContext, useEffect, useState } from "react";
import { Contacts, HttpResponseData, PageProps } from "../../../../../../shared/types";
import useHttp from "@/hooks/useHttp";
import AuthContext from "@/store/auth-context";
import { HttpEnum } from "../../../../../../shared/enums";
import ContactForm from "@/components/ui/contact-form";
import LoadingSpinner from "@/components/ui/loading-spinner";


const Page: React.FC<PageProps> = ({ params }) => {
    const [contacts, setContacts] = useState<Contacts>({});

    const [initialPageLoad, setInitialPageLoad] = useState(true);

    const router = useRouter();

    // Destructure properties from custom HTTP hook.
    const { isLoading: detailsIsLoading, error: detailsError, sendHttpRequest: contactDetailsHttpRequest } = useHttp();

    // Destructure properties from custom HTTP hook.
    const { isLoading: editContactIsLoading, error: editContactError, sendHttpRequest: editContactHttpRequest } = useHttp();

    useEffect(() => {
        if (detailsError) {
            toast.error(detailsError, { autoClose: false });
        }

        if (editContactError) {
            toast.error(editContactError);
        }
    }, [detailsError, editContactError]);

    const { id: contactId } = params;

    const authContext = useContext(AuthContext)

    const { token } = authContext;

    useEffect(() => {
        if (initialPageLoad) {
            setInitialPageLoad(false)
        }

        // Function to handle the http response from the contactDetailsHttpRequest() HTTP request
        const myResponse = (res: HttpResponseData) => {
            const { data, status } = res;

            if (status === HttpEnum.SUCCESS) {

                toast.success("Contact details fetched successfully!");

                console.log(data);

                const formattedContacts: Contacts = {
                    _id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber
                };

                setContacts(formattedContacts)

            };
        };

        // Send the HTTP request to the fetch a specific contact details with it's ID on page load
        contactDetailsHttpRequest(
            {
                url: `contact/${contactId}`,
                token: token,
            },
            // Callback function to handle the response.
            myResponse
        );

    }, [contactDetailsHttpRequest, token]);

    // Function to handle the http response from the editContactHttpRequest() HTTP request
    const editContactRequestResponse = (res: HttpResponseData) => {
        const { status } = res;

        if (status === HttpEnum.SUCCESS) {
            toast.success("Contact edited successfully!");

            router.push("/contact")
        };
    }

    const handleFormSubmit = (formData: Contacts) => {
        const { firstName, lastName, phoneNumber } = formData;

        // Send HTTP request to the edit contact
        editContactHttpRequest({
            url: `contact/${contactId}`,
            method: "PATCH",
            token,
            body: {
                firstName,
                lastName,
                phoneNumber
            }
        },
        // Callback function to handle the response.
            editContactRequestResponse
        )
    }


    

    const isContactsEmpty = Object.keys(contacts).length === 0;

    if (initialPageLoad || detailsIsLoading) return <LoadingSpinner />

    if (isContactsEmpty) {
        return <p>Contact not found</p>
    }

    return (<ContactForm
        title="Edit Contact"
        formDetails={contacts}
        isLoading={editContactIsLoading}
        handleFormSubmit={handleFormSubmit} />
    );
}

export default Page;
