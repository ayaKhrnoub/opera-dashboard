import { useCallback, useState } from "react";
import { Button, Input, Loading, UploadFile } from "../components";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import usePostRequest from "../hooks/usePostRequest";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type ErrorType = {
  title: string;
  image: string;
  text: string;
};

const AddNews = () => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [errors, setErrors] = useState<ErrorType>({
    title: "",
    image: "",
    text: "",
  });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (e: EditorState) => {
    setEditorState(e);
  };
  const navigate = useNavigate();
  const { postRequest, isLoading } = usePostRequest();

  const validate = useCallback(() => {
    const tempErrors: ErrorType = {
      title: "",
      image: "",
      text: "",
    };
    tempErrors.title = name ? "" : "This field is required";
    tempErrors.image = image ? "" : "This field is required";
    tempErrors.text =
      draftToHtml(convertToRaw(editorState.getCurrentContent())) === "<p></p>"
        ? "This field is required"
        : "";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  }, [name, image, draftToHtml(convertToRaw(editorState.getCurrentContent()))]);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        title: name,
        photo: image,
        text: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      };
      await postRequest("/api/admin/news", formData, true);
      navigate("/news");
    }
  };
  return (
    <>
      <Title>
        <h1 className="text-start text-3xl font-bold pl-4 text-white">news</h1>
      </Title>
      <section className="pt-nav-height py-1">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-8">
          <h2 className="text-center font-bold capitalize text-2xl mb-4">
            add news
          </h2>
          <form
            onSubmit={handelSubmit}
            className="relative flex p-4 flex-col min-w-0 bg-white w-full mb-6 shadow-lg rounded "
          >
            <Input
              error={errors.title}
              label="news title"
              setValue={setName}
              value={name}
            />
            <UploadFile error={errors.image} setFile={setImage} />
            <div>
              <Editor
                editorState={editorState}
                toolbarClassName=""
                wrapperClassName="bg-white text-xl p-4 rounded-xl border border-primary mb-4"
                editorClassName=" bg-gray-200 px-3"
                onEditorStateChange={(e) => onEditorStateChange(e)}
              />
              <p className="text-red-700 pl-4 text-xl">{errors.text}</p>
            </div>
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

export default AddNews;
