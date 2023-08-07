import { Button, Loading, Modal } from ".";

type Props = {
  isOpen: boolean;
  text: string;
  actionName: string;
  isLoading: boolean;
  onClose: () => void;
  action: () => void;
};

const ConfirmModal = ({
  isOpen,
  onClose,
  text,
  actionName,
  action,
  isLoading,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} clickOutSide>
      <h2 className="text-center my-4 font-bold text-2xl">{text}</h2>
      <div className="flex mb-4 justify-center items-center gap-4">
        <Button variant="blue" onClick={onClose}>
          cancel
        </Button>
        <Button
          disabled={isLoading}
          variant="red"
          onClick={async () => {
            await action();
            onClose();
          }}
        >
          {isLoading ? <Loading /> : <span>{actionName}</span>}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
