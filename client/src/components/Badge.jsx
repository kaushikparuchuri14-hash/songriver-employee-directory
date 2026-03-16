import { Box, Image, Text, Stack } from "@chakra-ui/react";

export const Badge = ({ badge }) => (
  <Box textAlign="center">
    <Stack spacing={2} align="center">
      <Image
        boxSize="100px"
        objectFit="cover"
        src={`http://localhost:3030/${badge.imageFilePath}`}
        alt={badge.name}
      />
      <Text fontSize="lg">{badge.name}</Text>
    </Stack>
  </Box>
);