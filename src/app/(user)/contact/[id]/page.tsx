"use client"

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { useContext, useEffect, useState } from "react";
import { Contacts, HttpResponseData, PageProps } from "../../../../../shared/types";
import useHttp from "@/hooks/useHttp";
import AuthContext from "@/store/auth-context";
import { HttpEnum } from "../../../../../shared/enums";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Card from "@/components/ui/card";


const Page: React.FC<PageProps> = ({ params }) => {
  const [contacts, setContacts] = useState<Contacts>({});

  const [initialPageLoad, setInitialPageLoad] = useState(true);

  const router = useRouter();

  // Destructure properties from custom HTTP hook.
  const { isLoading: detailsIsLoading, error: detailsError, sendHttpRequest: contactDetailsHttpRequest } = useHttp();

  // Destructure properties from custom HTTP hook.
  const { isLoading: deleteContactIsLoading, error: deleteContactError, sendHttpRequest: deleteContactHttpRequest } = useHttp();

  useEffect(() => {
    if (detailsError) {
      toast.error(detailsError, { autoClose: false });
    } 

    if( deleteContactError) {
      toast.error(deleteContactError);
  }
  }, [detailsError, deleteContactError]);

  const { id: contactId } = params;

  const authContext = useContext(AuthContext)

  const { token } = authContext;

  useEffect(() => {
    if (initialPageLoad) {
      setInitialPageLoad(false)
    }

    // Function to handle the http response from the contactDettailsHttpRequest() HTTP request
    const myResponse = (res: HttpResponseData) => {
      const { data, status } = res;

      if (status === HttpEnum.SUCCESS) {

        toast.success("Contact details fetched successfully!");

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



  // Function to handle the http response from the handleContactDelete() HTTP request
  const dleteContactRequestResponse = (res: HttpResponseData) => {
    const { status } = res;

    if (status === HttpEnum.SUCCESS) {
      toast.success("Contact deleted successfully!");

      router.push("/contact")
    };
  }

  const handleContactDelete = (_id?: string) => {

    // Send HTTP request to the delete contact
    deleteContactHttpRequest({
      url: `contact/${_id}`,
      method: "DELETE",
      token
    },
    // Callback function to handle the response.
      dleteContactRequestResponse
    )
  }
  

  const isContactsEmpty = Object.keys(contacts).length === 0;

  if (initialPageLoad || detailsIsLoading) return <LoadingSpinner />

  if (isContactsEmpty) {
    return <p>Contact not found</p>
  }

  return (
    <div className="px-20 max-w-2xl mx-auto mt-20">
      <p className="text-center">Contact Details</p>
      <Card
        _id={contacts._id}
        title={contacts.firstName}
        subTitle={contacts.lastName}
        handleDeleteBtnClick={handleContactDelete}
        deleteContactIsLoading={deleteContactIsLoading}
        description={contacts.phoneNumber} />
    </div>
  );
}

export default Page;
