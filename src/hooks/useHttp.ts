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

   // Function to send an HTTP request, using useCallback to prevent unnecessary re-creations of the function.
  const sendHttpRequest = useCallback(
    async (
      requestConfig: RequestConfigType,
      applyData: (data: any) => void // Callback function to handle the response data.
    ) => {
      setIsLoading(true);

      setError(null);

      try {
        const response = await fetch(`https://hux-assessment-backend-production.up.railway.app/api/v1/${requestConfig.url}`, {
          method: requestConfig.method ? requestConfig.method : "GET", // Use provided method or default to GET.
          headers: {
            "Content-Type": requestConfig.contentType
              ? requestConfig.contentType
              : "application/json", // Set content type header, defaulting to JSON.
            Authorization: requestConfig.token
              ? `Bearer ${requestConfig.token}`
              : "", // Include Authorization header if a token is provided.
          },
          body: JSON.stringify(requestConfig.body),
        });

        let responseData: HttpResponseData = await response.json();

        if (response.ok) {
          // If the response is OK, apply the data using the provided callback.
          applyData(responseData);
        } else if (response.status === 401) {
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
    // Empty dependency array ensures useCallback only creates this function once per component lifecycle.
    []
  );

  return {
    isLoading,
    error,
    sendHttpRequest,
  };
};

export default useHttp;
