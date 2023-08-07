import { useState } from "react";
import { axiosInstance } from "../axios";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { useToast } from ".";
import { useNavigate } from "react-router-dom";

const useGetRequest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<unknown | undefined>();
  const navigate = useNavigate();

  const toast = useToast();

  const getRequest = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      setResponse(response.data);
    } catch (error) {
      const err = error as AxiosError;
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

  return { getRequest, isLoading, response };
};

export default useGetRequest;
