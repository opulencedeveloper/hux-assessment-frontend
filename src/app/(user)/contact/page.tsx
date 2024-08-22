"use client"

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { HttpEnum } from "../../../../shared/enums";
import { Contacts, HttpResponseData } from "../../../../shared/types";
import Card from "@/components/ui/card";
import useHttp from "@/hooks/useHttp";
import AuthContext from "@/store/auth-context";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function ContactsInfo() {
    const [contacts, setContacts] = useState([]);

    const [initialPageLoad, setInitialPageLoad] = useState(true);

    const { isLoading, error, sendHttpRequest: fetchContactsHttpRequest } = useHttp();

    useEffect(() => {
        if (error) {
            toast.error(error, { autoClose: false });
        }
    }, [error]);

    const router = useRouter();

    const authContext = useContext(AuthContext)

    const { token } = authContext;

    useEffect(() => {
        if (initialPageLoad) {
            setInitialPageLoad(false);
        }

        const myResponse = (res: HttpResponseData) => {
            const { data, status } = res;

            if (status === HttpEnum.SUCCESS) {

                const formattedContacts = data.map((contact: Contacts) => ({
                    _id: contact._id,
                    firstName: contact.firstName,
                    lastName: contact.lastName
                }));

                setContacts(formattedContacts)

            };
        };

        fetchContactsHttpRequest(
            {
                url: "contacts",
                token: token,
            },
            myResponse
        );

    }, [fetchContactsHttpRequest, token]);

    const handleCardClick = (_id?: string) => {
        router.push(`/contact/${_id}`);

    }

    return <section id="testimonies" className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-8 md:px-10 lg:px-20">


            <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
                <div className="mb-12 space-y-5 md:mb-16 md:text-center">
                    <div
                        className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
                        Contacts
                    </div>
                    <h1 className="mb-5 text-3xl font-semibold text-white md:text-center md:text-5xl">
                        Welcome!!!
                    </h1>
                    <Link className="bg-indigo-600 btn hover:bg-indigo-500" href="/createcontact">Create Contact</Link>
                </div>
            </div>


            <div className="flex flex-col items-center justify-center mx-auto">
                {isLoading || initialPageLoad ? <LoadingSpinner /> :
                    contacts.length === 0 ? <p>Start creating your contacts!</p> :
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                            {contacts.map((contact: Contacts) => <Card
                                key={contact._id}
                                _id={contact._id}
                                handleCardClick={handleCardClick}
                                title={contact.firstName}
                                subTitle={contact.lastName} />)}

                        </div>}
            </div>
        </div>
    </section>
}