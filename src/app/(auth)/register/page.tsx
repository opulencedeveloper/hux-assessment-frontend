"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { toast } from "react-toastify";

import Auth from "@/components/application/auth/auth";
import { AuthContactForm, HttpResponseData } from "../../../../shared/types";
import { HttpEnum } from "../../../../shared/enums";
import useHttp from "@/hooks/useHttp";


const Register = () => {
    const router = useRouter();

    // Destructure properties from custom HTTP hook.
    const { isLoading, error, sendHttpRequest: signUpHttpRequest } = useHttp();

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Function to handle the http response from the signup(signUpHttpRequest()) HTTP request
    const signUpRequestResponse = (res: HttpResponseData) => {
        const { status } = res;

        if (status === HttpEnum.SUCCESS) {
            toast.success("User creation successful!");

            router.push("/login")

        };
    }

    const handleSubmit = (formData: AuthContactForm) => {
        const { password, confirmPassword, userName } = formData;

        // Send the HTTP request to the signup endpoint
        signUpHttpRequest({
            url: "signup",
            method: "POST",
            body: {
                password,
                confirmPassword,
                userName
            }
        },
        // Callback function to handle the response.
            signUpRequestResponse
        )
    };

    return <Auth isLoading={isLoading} isSignUp={true} handleFormSubmit={handleSubmit} />
}

export default Register;