import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSearchTerm } from "../hooks/useSearchTerm";

export function EmployeeResult({ employee }) {
    const [searchTerm] = useSearchTerm();
  return (
    <Link to={`/employees/${employee.id}?q=${searchTerm}`}>
    <Flex
      boxShadow="md"
      borderRadius="md"
      p={3}
      align="center"
      gap={4}
      bg="white"
    >
      <Box flexShrink={0}>
        <Image
          boxSize="100px"
          src={`http://localhost:3030/${employee.imageFilePath}`}
          alt={`${employee.firstName} ${employee.lastName}`}
          borderRadius="md"
          objectFit="cover"
        />
      </Box>
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          {employee.firstName} {employee.lastName}
        </Text>
        <Text fontSize="md" color="gray.600">
          {employee.teamName}
        </Text>
      </Box>
    </Flex>
    </Link>
  );
}
