import { Grid, Heading, Stack } from "@chakra-ui/react";
import { AddBadge } from "./AddBadge";
import { Badge } from "./Badge";

export const Badges = ({ employee }) => {
  const { badgeDetails = [] } = employee;

  return (
    <Stack
      pt={6}
      mt={8}
      borderTopWidth="1px"
      borderColor="blue.800"
      width="100%"
      align="center"
      spacing={6}
    >
      <Heading size="lg">
        {badgeDetails.length > 0 ? "Badges" : "No Badges Yet"}
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={10} width="100%">
        {badgeDetails.map((badge) => (
          <Badge key={badge.id} badge={badge} />
        ))}
        <AddBadge employee={employee}/> 
      </Grid>
    </Stack>
  );
};
