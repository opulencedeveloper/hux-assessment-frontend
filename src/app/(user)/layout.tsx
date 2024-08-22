"use client";

import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    const logoutHandler = () => {
        if (confirm("Are you sure you want to log out?")) {
            authContext.logout();

            router.push("/");
        }
    };

    return (
        <main className="w-full flex flex-col">
            <button
                onClick={logoutHandler}
                className="bg-white max-w-52 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
                Logout
            </button>
            {children}
        </main>
    );
}
