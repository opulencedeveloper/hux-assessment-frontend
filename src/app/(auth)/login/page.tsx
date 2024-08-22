"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import Auth from "@/components/application/auth/auth";
import { AuthContactForm, HttpResponseData } from "../../../../shared/types";
import { HttpEnum } from "../../../../shared/enums";
import useHttp from "@/hooks/useHttp";
import AuthContext from "@/store/auth-context";

const Login = () => {
    const router = useRouter(); 

     // Destructure properties from custom HTTP hook.
    const { isLoading, error, sendHttpRequest: signInHttpRequest } = useHttp();

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Function to handle the http response from the signup(signInHttpRequest()) HTTP request
    const signInRequestResponse = (res: HttpResponseData) => {
        const { status, data } = res;

        if (status === HttpEnum.SUCCESS) {
            toast.success("Login successful!");

            authContext.login(data.token);

            router.push("/contact")
        };
    }

    const handleSubmit = (formData: AuthContactForm) => {
        const { password, userName } = formData;

        // Send the HTTP request to the signin endpoint
        signInHttpRequest({
            url: "signin",
            method: "POST",
            body: {
                password,
                userName
            }
        },
        // Callback function to handle the response.
            signInRequestResponse
        )
    };

    return <Auth isSignUp={false} handleFormSubmit={handleSubmit} isLoading={isLoading} />
}

export default Login;