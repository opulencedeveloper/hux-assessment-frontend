"use client"

import Link from "next/link";
import Image from "next/image";

import navLogo from "@/assets/images/logo.svg";
import { useContext, useState, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";

export default function Header() {
    const authContext = useContext(AuthContext);

    const { token } = authContext;

    const router = useRouter();

    if (token) {
        router.push("/contact")
    }

    return (
        <header className="flex items-center justify-between py-6">
            <Link href="/">
                <Image className="block w-8 h-8" src={navLogo} alt="" />
            </Link>
            <div className="flex items-center mb-4 md:block">
                <Link className="mr-8 font-semibold hover:text-white" href="/">
                    Welcome
                </Link>
                <Link className="bg-indigo-600 btn hover:bg-indigo-500" href="/register">
                    Sign up
                </Link>
            </div>
        </header>
    );
}
