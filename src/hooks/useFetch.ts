import { useReducer, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { axiosInstance } from "../axios";
import Cookies from "js-cookie";
import { useToast } from ".";
import { useNavigate } from "react-router-dom";

interface FetchedData {
  data: unknown[];
  isLoading: boolean;
  error: boolean;
}

interface FetchedData {
  data: unknown[];
  isLoading: boolean;
  error: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const initialState: FetchedData = {
  data: [],
  error: false,
  isLoading: true,
};

function reducer(state: FetchedData, action: Action) {
  switch (action.type) {
    case "FETCHING_DATA":
      return { data: [], error: false, isLoading: true };
    case "FETCHED_DATA":
      const data = action.payload.results
        ? action.payload.results
        : action.payload;
      return { ...state, data, isLoading: false };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: true };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const useFetch = (url: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCHING_DATA", payload: null });
    try {
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      const data = await response.data;
      dispatch({ type: "FETCHED_DATA", payload: data });
    } catch (error) {
      const err = error as AxiosError;
      console.log(error);
      console.log(err);
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
      dispatch({ type: "FETCH_ERROR", payload: null });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { data, isLoading, error } = state;
  return { data, isLoading, error };
};

export default useFetch;
