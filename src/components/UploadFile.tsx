import { useState, useRef, Fragment } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import { Button } from ".";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  error: string;
  title?: string;
}

const UploadFile = ({ setFile, error, title }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);
  const selectFile = () => fileRef.current?.click();
  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file?.type.split("/")[0] === "image") {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };
  const onDragOver = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };
  const onDragLeave = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsDragging(true);
    const file = event.dataTransfer.files?.[0];
    if (file?.type.split("/")[0] === "image") {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const deleteImage = () => {
    setImage(undefined);
    setImageUrl("");
    setFile(undefined);
  };
  return (
    <div className="mb-8 relative w-full rounded-xl border py-2 px-3 border-primary">
      <h2 className="text-xl pl-4 pb-2">{title}</h2>
      <div className="w-11/12 mx-auto bg-white/50 rounded-lg border-2 border-dashed border-black">
        <div
          className={`m-4 flex justify-center items-center ${
            image ? "cursor-auto" : "cursor-pointer"
          } flex-col`}
          onClick={selectFile}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {image ? (
            <div>
              <div className="w-full h-24">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </div>
              <div className="w-full mt-4 flex justify-center items-center">
                <Button size="sm" onClick={deleteImage}>
                  cancel
                </Button>
              </div>
            </div>
          ) : (
            <Fragment>
              <BsCloudUploadFill className="text-5xl mt-4 text-primary" />
              {isDragging ? (
                <p className="py-4 text-xl">drop it to choose</p>
              ) : (
                <p className="py-4 text-xl text-center">
                  choose an image or drag it here
                </p>
              )}
              <input
                type="file"
                className="hidden"
                ref={fileRef}
                onChange={onFileSelect}
              />
            </Fragment>
          )}
        </div>
      </div>
      {!!error ? <p className="text-red-700 pl-6 text-xl">{error}</p> : null}
    </div>
  );
};

export default UploadFile;
