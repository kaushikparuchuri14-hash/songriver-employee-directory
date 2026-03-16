import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { toast } from "./Toast";

export const AddBadge = ({ employee }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const [selectedBadgeId, setSelectedBadgeId] = useState("");
  const [errorShown, setErrorShown] = useState(false);

  const { data: badges = [], isLoading } = useQuery(
    ["badges", "all"],
    async () => {
      const res = await fetch("http://localhost:3030/badges");
      return res.json();
    },
    {
      select: (data) =>
        data.sort((a, b) => a.name.localeCompare(b.name)),
    }
  );

  const { mutate: assignBadge } = useMutation({
    mutationFn: async ({ badgeId, employeeId }) => {
      const res = await fetch(
        `http://localhost:3030/employees/${employeeId}/badges?badgeId=${badgeId}`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error(res.statusText);
    },
    onError: (error) =>
      toast({
        title: "Failed to add badge",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["employee", String(employee.id)]);
      toast({
        title: "Badge added!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = () => {
    if (!selectedBadgeId) {
      setErrorShown(true);
      return;
    }

    assignBadge({
      badgeId: selectedBadgeId,
      employeeId: employee.id,
    });

    setSelectedBadgeId("");
    setErrorShown(false);
    onClose();
  };

  const handleCancel = () => {
    setSelectedBadgeId("");
    setErrorShown(false);
    onClose();
  };

  const availableBadges = badges.filter(
    (badge) => !employee.badgeIds.includes(badge.id)
  );

  return (<>
      <VStack>
        <IconButton
          icon={<AddIcon />}
          aria-label="Add new badge"
          isRound
          width="100px"
          height="100px"
          onClick={onOpen}
        />
        <Text fontSize="lg">Add new badge</Text>
      </VStack>
      <Modal isOpen={isOpen} onClose={handleCancel} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Badge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorShown && (
              <Text color="red.500" textAlign="center" fontWeight="semibold">
                Please select a badge
              </Text>
            )}
            <Select
              placeholder="Select badge"
              value={selectedBadgeId}
              onChange={(e) => {
                setSelectedBadgeId(e.target.value);
                setErrorShown(false);
              }}
              isDisabled={isLoading}
            >
              {availableBadges.map((badge) => (
                <option key={badge.id} value={badge.id}>
                  {badge.name}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Add badge
            </Button>
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>);};
