import Image from "next/image";

import featuresSplitI from "@/assets/images/placeholder.png";
import featuresSplitII from "@/assets/images/placeholder.png";
import featuresSplitIII from "@/assets/images/placeholder.png";

export default function Details() {
    return (
        <div className="mb-16 border-b border-gray-800">
            <h2 className="mb-2 title sm:text-4xl md:text-5xl">
                Designed to Simplify Your Work
            </h2>
            <p className="mb-20 mx-auto intro sm:max-w-xl">
                Our contact management system is built to enhance your workflow, allowing you to manage your contacts efficiently and effectively with minimal effort.
            </p>

            <div className="flex flex-col mb-8 sm:flex-row">
                <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
                    <Image
                        className="rounded-sm"
                        src={featuresSplitI}
                        alt="Contact Organization"
                    />
                </div>
                <div className="flex flex-col justify-center mb-8 sm:w-1/2 md:w-7/12 sm:pr-16">
                    <p className="mb-2 text-sm font-semibold leading-none text-center text-indigo-600 uppercase sm:text-left">
                        Streamlined Management
                    </p>
                    <h3 className="title title-small sm:text-left md:text-4xl">
                        Organize Your Contacts Seamlessly
                    </h3>
                    <p className="text md:text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                      </p>
                </div>
            </div>

            <div className="flex flex-col mb-8 sm:flex-row">
                <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
                    <Image
                        className="rounded-sm"
                        src={featuresSplitII}
                        alt="Contact Editing"
                    />
                </div>
                <div className="flex flex-col justify-center mb-8 sm:w-1/2 md:w-7/12 sm:pl-16">
                    <p className="mb-2 text-sm font-semibold leading-none text-center text-indigo-600 uppercase sm:text-left">
                        Effortless Updates
                    </p>
                    <h3 className="title title-small sm:text-left md:text-4xl">
                        Edit Contacts with Ease
                    </h3>
                    <p className="text md:text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                            </p>
                </div>
            </div>

            <div className="flex flex-col mb-8 sm:flex-row">
                <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
                    <Image
                        className="rounded-sm"
                        src={featuresSplitIII}
                        alt="Data Security"
                    />
                </div>
                <div className="flex flex-col justify-center mb-8 sm:w-1/2 md:w-7/12 sm:pl-16">
                    <p className="mb-2 text-sm font-semibold leading-none text-center text-indigo-600 uppercase sm:text-left">
                        Secure and Reliable
                    </p>
                    <h3 className="title title-small sm:text-left md:text-4xl">
                        Keep Your Data Safe
                    </h3>
                    <p className="text md:text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
        </div>
    );
}
