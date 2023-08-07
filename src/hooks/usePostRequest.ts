import { useState } from "react";
import { axiosInstance } from "../axios";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { useToast } from ".";
import { useNavigate } from "react-router-dom";

const usePostRequest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [response, setResponse] = useState<unknown | undefined>();
  const navigate = useNavigate();

  const toast = useToast();

  const postRequest = async (url: string, body: unknown, hasImage: boolean) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(url, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(response.data);
    } catch (error) {
      const err = error as AxiosError;
      setIsError(true);
      if (!err.response) {
        toast(
          "Please check your internet connection",
          "error",
          "bottom-left",
          "dark"
        );
      } else {
        if (err.response.status === 401) {
          toast(
            "Oops, your session has timed out! Please log in again to continue.",
            "error",
            "bottom-left",
            "dark"
          );
          Cookies.remove("token");
          navigate("/");
        } else {
          toast(
            "An unexpected error occurred, please try again later",
            "error",
            "bottom-left",
            "dark"
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { postRequest, isError, isLoading, response };
};

export default usePostRequest;
