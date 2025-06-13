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
        <Dialog.Backdrop bg="blackAlpha.600" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            borderRadius="xl"
            shadow="2xl"
            border="1px"
            borderColor="gray.200"
            maxW="4xl"
            mx={4}
          >
            <Dialog.Header p={6} borderBottom="1px" borderColor="gray.200">
              <Dialog.Title
                fontSize="2xl"
                fontWeight="bold"
                color="gray.800"
                lineHeight="short"
              >
                {document?.title}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body p={6}>
              <Text
                fontSize="md"
                color="gray.700"
                lineHeight="relaxed"
                whiteSpace="pre-wrap"
              >
                {document?.content}
              </Text>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="lg"
                position="absolute"
                top={6}
                right={6}
                color="gray.500"
                _hover={{
                  color: "gray.700",
                  bg: "gray.100",
                }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DocumentModal;
