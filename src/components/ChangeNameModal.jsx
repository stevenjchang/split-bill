import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Tag,
  TagRightIcon,
  Input
} from "@chakra-ui/react";
import { GrEdit } from "react-icons/gr";

const ChangeNameModal = ({ propsIsOpen, idx, personName, handleNameChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (propsIsOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [propsIsOpen, onOpen, onClose]);

  const handleChange = (event) => setValue(event.target.value);

  const handleSubmit = () => {
    handleNameChange(idx, value);
    onClose();
  };
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Tag onClick={onOpen}>
        {`Person ${idx + 1}`}
        <TagRightIcon boxSize="12px" as={GrEdit} />
      </Tag>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              fontWeight="bold"
              mb="1rem"
              onClick={() => handleNameChange(idx, "danking")}
            >
              Person
            </Text>
            <Input
              variant="filled"
              placeholder="Enter Name"
              value={value}
              onChange={handleChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Enter
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeNameModal;
