import Image from "next/image";
import Link from "next/link";

import img from "@/assets/images/placeholder.png";

export default function Hero() {
    return (
        <>
            <h1 className="px-8 mt-16 mb-4 text-5xl font-extrabold leading-tight text-center text-white xl:text-6xl">
                Manage Your Contacts <span className="text-indigo-700">Effortlessly</span>
            </h1>
            <p className="max-w-xl mx-auto mb-8 text-xl text-center text-gray-300 xl:max-w-2xl">
                Seamlessly manage your contacts with our intuitive web app. Stay organized and keep your connections up to date, all in one place.
            </p>
            <div className="flex flex-col justify-center max-w-xs mx-auto mb-12 sm:max-w-full sm:flex-row">
                <Link
                    className="w-full mb-4 whitespace-no-wrap bg-indigo-600 btn btn-tall md:w-auto hover:bg-indigo-500 sm:mr-2"
                    href="/register"
                >
                    Get Started
                </Link>
                <Link
                    className="w-full mb-4 whitespace-no-wrap bg-gray-800 btn btn-tall md:w-auto hover:bg-gray-600 sm:ml-2"
                    href="/login"
                >
                    Login
                </Link>
            </div>
            <div className="mb-16">
                <Image
                    src={img}
                    className="block w-full max-w-5xl mx-auto rounded"
                    alt=""
                />
            </div>
        </>
    );
}
