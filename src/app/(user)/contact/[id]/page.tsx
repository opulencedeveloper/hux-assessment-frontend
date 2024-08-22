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

  const { isLoading: detailsIsLoading, error: detailsError, sendHttpRequest: contactDettailsHttpRequest } = useHttp();

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

    const myResponse = (res: HttpResponseData) => {
      const { data, status } = res;

      if (status === HttpEnum.SUCCESS) {

        toast.success("Contact details fetched successfully!");

        console.log(data);

        const formattedContacts: Contacts = {
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber
        };

        setContacts(formattedContacts)

      };
    };

    contactDettailsHttpRequest(
      {
        url: `contact/${contactId}`,
        token: token,
      },
      myResponse
    );

  }, [contactDettailsHttpRequest, token]);



  const dleteContactRequestResponse = (res: HttpResponseData) => {
    const { status } = res;

    if (status === HttpEnum.SUCCESS) {
      toast.success("Contact deleted successfully!");

      router.push("/contact")
    };
  }

  const handleContactDelete = (_id?: string) => {

    deleteContactHttpRequest({
      url: `contact/${_id}`,
      method: "DELETE",
      token
    },
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
