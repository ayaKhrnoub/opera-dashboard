import { useCallback, useState } from "react";
import { Button, Input, Loading, UploadFile } from "../components";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import usePostRequest from "../hooks/usePostRequest";

type ErrorType = {
  name: string;
  image: string;
  number: string;
};

const AddTheater = () => {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [errors, setErrors] = useState<ErrorType>({
    name: "",
    image: "",
    number: "",
  });

  const navigate = useNavigate();
  const { postRequest, isLoading } = usePostRequest();

  const validate = useCallback(() => {
    const tempErrors: ErrorType = {
      name: "",
      image: "",
      number: "",
    };
    tempErrors.name = name ? "" : "This field is required";
    tempErrors.image = image ? "" : "This field is required";
    tempErrors.number =
      number === ""
        ? "This field is required"
        : /^\d+$/.test(number)
        ? ""
        : "Please enter a valid number";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  }, [name, image, number]);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        name,
        photo: image,
        seats_number:number
      };
      await postRequest("/api/admin/theater/add", formData);
      navigate("/theater");
    }
  };
  return (
    <>
      <Title>
        <h1 className="text-start text-3xl font-bold pl-4 text-white">
          Theater
        </h1>
      </Title>
      <section className="pt-nav-height py-1">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-8">
          <h2 className="text-center font-bold capitalize text-2xl mb-4">
            add new theater
          </h2>
          <form
            onSubmit={handelSubmit}
            className="relative flex p-4 flex-col min-w-0 bg-white w-full mb-6 shadow-lg rounded "
          >
            <Input
              error={errors.name}
              label="theater name"
              setValue={setName}
              value={name}
            />
            <Input
              error={errors.number}
              label="seats number"
              setValue={setNumber}
              value={number}
            />
            <UploadFile error={errors.image} setFile={setImage} />
            <div className="flex justify-center items-center">
              <Button type="submit">
                {isLoading ? (
                  <Loading size="lg" variant="spinner" />
                ) : (
                  <span>add</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddTheater;
