type Props = {
  title: string;
  text: string;
  isTextHtml?: boolean;
};

const InformationField = ({ title, text, isTextHtml }: Props) => {
  return (
    <div className="w-full mb-4 flex justify-center items-start">
      <p className="flex-1 font-bold capitalize text-2xl">{title}:</p>
      {isTextHtml ? (
        <div
          className="flex-1 text-2xl font-medium"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ) : (
        <p className="flex-1 text-2xl font-medium">{text}</p>
      )}
    </div>
  );
};

export default InformationField;
