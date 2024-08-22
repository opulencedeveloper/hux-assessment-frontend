import Link from "next/link";
import { AuthContactForm, AuthProps, FormInputOnchange } from "../../../../shared/types"
import { useState } from "react";


const Auth: React.FC<AuthProps> = (props) => {
    const [userName, setUserName] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const { isSignUp, handleFormSubmit, isLoading } = props;

    const handleContactSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const contactDetails: AuthContactForm = {
            userName,
            password,
            confirmPassword
        }

        handleFormSubmit(contactDetails);
    }

    const lableTextI = isSignUp ? "Log in" : "Register";

    const lableTextII = isSignUp ? "Register" : "Log in";

    const linkUrl = isSignUp ? "/login" : "/register"

    const title = isSignUp ? "Welcome back! Enter credentials to create account." : "Welcome! Enter your credentials to continue."

    return <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">

        <div className="relative mt-12 w-full max-w-lg sm:mt-10">
            <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
            ></div>
            <div
                className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
                <div className="flex flex-col p-6">
                    <h3 className="text-xl font-semibold leading-6 tracking-tighter">{lableTextII}</h3>
                    <p className="mt-1.5 text-sm font-medium text-white/50">{title}
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <form onSubmit={handleContactSubmit}>
                        <div
                            className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                            <div className="flex justify-between">
                                <label
                                    htmlFor="userName"
                                    className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Username</label>

                            </div>
                            <input required type="text" id="userName" placeholder="Username"
                                onChange={((event: FormInputOnchange) => setUserName(event.target.value))}
                                className="block w-full border-0 bg-black p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-red-500 file:px-4 file:py-2 file:font-medium focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                        </div>
                        <div className="mt-4">
                            <div>
                                <div
                                    className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                    <div className="flex justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-xs font-medium text-muted-foreground group-focus-within:text-black text-gray-400">Password</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input required type="password" id="password"
                                            onChange={((event: FormInputOnchange) => setPassword(event.target.value))}
                                            className="block w-full border-0 bg-black p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isSignUp && <div className="mt-4">
                            <div>
                                <div
                                    className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                    <div className="flex justify-between">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="text-xs font-medium text-muted-foreground group-focus-within:text-black text-gray-400">Confirm Password</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input required={isSignUp} type="password" id="confirmPassword"
                                            onChange={((event: FormInputOnchange) => setConfirmPassword(event.target.value))}
                                            className="block w-full border-0 bg-black p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <div className="mt-4 flex items-center justify-end gap-x-2">
                            <Link className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                                href={linkUrl}>{lableTextI}</Link>
                            <button
                                className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                            >{isLoading ? "Please wait..." : lableTextII}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default Auth;