import { useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { HttpResponseData, RequestConfigType } from "../../shared/types";
import { toast } from "react-toastify";
import AuthContext from "@/store/auth-context";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const authContext = useContext(AuthContext);

  const sendHttpRequest = useCallback(
    async (
      requestConfig: RequestConfigType,
      applyData: (data: any) => void
    ) => {
      setIsLoading(true);

      setError(null);

      try {
        const response = await fetch(`https://hux-assessment-backend-production.up.railway.app/api/v1/${requestConfig.url}`, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: {
            "Content-Type": requestConfig.contentType
              ? requestConfig.contentType
              : "application/json",
            Authorization: requestConfig.token
              ? `Bearer ${requestConfig.token}`
              : "",
          },
          body: JSON.stringify(requestConfig.body),
        });

        let responseData: HttpResponseData = await response.json();

        if (response.ok) {
          applyData(responseData);
        } else if (response.status === 401) {
          toast.error("Invalid Token!");

          authContext.logout();

          router.push("/");
        } else {
          throw new Error(responseData.message);
        }
      } catch (err) {
        setIsLoading(false);

        if (err instanceof Error) {
          if (err.message === "Failed to fetch") {
            setError("Network error: Please check your internet connection.");
          } else {
            setError(err.message);
          }
        } else {
          setError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    sendHttpRequest,
  };
};

export default useHttp;
