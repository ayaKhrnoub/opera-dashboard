import { useCallback, useState } from "react";
import { Button, Dropdown, Input, Loading, UploadFile } from "../components";
import Title from "../components/Title";
import DateInput from "../components/DateInput";
import TimeInput from "../components/TimeInput";
import { useNavigate } from "react-router-dom";
import usePostRequest from "../hooks/usePostRequest";
import { convertTime, formatDate } from "../utils";

type ErrorType = {
  name: string;
  image: string;
  programImage: string;
  date: string;
  time: string;
  orchestra: string;
  price: string;
  theaterId: string;
};

const AddParty = () => {
  const [name, setName] = useState<string>("");
  const [theater, setTheater] = useState<number>(0);
  const [orchestra, setOrchestra] = useState<string>("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [programImage, setProgramImage] = useState<File | undefined>(undefined);
  const [date, setDate] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [errors, setErrors] = useState<ErrorType>({
    name: "",
    image: "",
    programImage: "",
    date: "",
    time: "",
    orchestra: "",
    price: "",
    theaterId: "",
  });
  const navigate = useNavigate();
  const { postRequest, isLoading } = usePostRequest();

  const validate = useCallback(() => {
    const tempErrors: ErrorType = {
      name: "",
      image: "",
      programImage: "",
      date: "",
      time: "",
      orchestra: "",
      theaterId: "",
      price: "",
    };
    tempErrors.name = name ? "" : "This field is required";
    tempErrors.theaterId = theater !== 0 ? "" : "This field is required";
    tempErrors.date = date ? "" : "This field is required";
    tempErrors.time = time ? "" : "This field is required";
    tempErrors.orchestra = orchestra ? "" : "This field is required";
    tempErrors.image = image ? "" : "This field is required";
    tempErrors.programImage = programImage ? "" : "This field is required";
    tempErrors.price =
      price === ""
        ? "This field is required"
        : /^\d+$/.test(price)
        ? ""
        : "Please enter a valid number";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  }, [name, orchestra, price, image, date, time]);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        name,
        orchestra_name: orchestra,
        date: `${formatDate(new Date(date))} ${convertTime(time)}`,
        ticket_price: price,
        photo: image,
        program: programImage,
        orchestra_photo: programImage,
        theater_id: theater,
      };
      await postRequest("/api/admin/party/add", formData);
      navigate("/parties");
    }
  };

  return (
    <>
      <Title>
        <h1 className="text-start text-3xl font-bold pl-4 text-white">
          Parties
        </h1>
      </Title>
      <section className="pt-nav-height py-1">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-8">
          <h2 className="text-center font-bold capitalize text-2xl mb-4">
            add new party
          </h2>
          <form
            onSubmit={handelSubmit}
            className="relative flex p-4 flex-col min-w-0 bg-white w-full mb-6 shadow-lg rounded "
          >
            <Input
              error={errors.name}
              label="party name"
              setValue={setName}
              value={name}
            />
            <Dropdown setId={setTheater} />
            <UploadFile
              title="party image"
              error={errors.image}
              setFile={setImage}
            />
            <UploadFile
              title="program image"
              error={errors.programImage}
              setFile={setProgramImage}
            />
            <Input
              error={errors.orchestra}
              label="orchestra name"
              setValue={setOrchestra}
              value={orchestra}
            />
            <DateInput error={errors.date} setDate={setDate} />
            <TimeInput error={errors.time} setTime={setTime} time={time} />
            <Input
              error={errors.price}
              label="ticket price"
              setValue={setPrice}
              value={price}
            />
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

export default AddParty;
