import { useState } from "react";
import { Contacts, ContactFormProps, FormInputOnchange } from "../../../shared/types";

const ContactForm: React.FC<ContactFormProps> = (props) => {
    const { formDetails, isLoading, handleFormSubmit, title } = props;

    const [firstName, setFirstName] = useState(formDetails?.firstName || "");

    const [lastName, setLastName] = useState(formDetails?.lastName || "");
    
    const [phoneNumber, setPhoneNumber] = useState(formDetails?.phoneNumber || "");

    const handleContactSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const contactDetails: Contacts = {
            firstName,
            lastName,
            phoneNumber
        }

        handleFormSubmit(contactDetails);
    }


    return <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-gray-700 text-center font-extrabold mt-10 uppercase">
            {title}
        </div>
        <form onSubmit={handleContactSubmit} className="py-4 px-6" action="" method="POST">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                    Firstname
                </label>
                <input
                    required
                    value={firstName}
                    onChange={((event: FormInputOnchange) => setFirstName(event.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName" type="text" placeholder="Enter first name" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                    Lastname
                </label>
                <input
                    value={lastName}
                    required
                    onChange={((event: FormInputOnchange) => setLastName(event.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName" type="text" placeholder="Enter last name" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                    Phone Number
                </label>
                <input
                    value={phoneNumber}
                    required
                    onChange={((event: FormInputOnchange) => setPhoneNumber(event.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="flex items-center justify-center mb-4">
                <button
                    disabled={isLoading}
                    className="text-white py-2 px-4 rounded bg-gray-800 focus:outline-none focus:shadow-outline"
                >
                    {isLoading ? "Please wait..." : "Submit"}
                </button>
            </div>

        </form> </div>
}

export default ContactForm;