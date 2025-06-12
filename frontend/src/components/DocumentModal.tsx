import { Dialog, Portal, CloseButton, Text } from "@chakra-ui/react";

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: { id: number; title: string; content: string } | null;
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  document,
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => details.open || onClose()}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{document?.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>{document?.content}</Text>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DocumentModal;
