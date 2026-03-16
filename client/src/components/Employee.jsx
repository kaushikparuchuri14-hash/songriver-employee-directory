import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { HStack,VStack,Image,Text,Heading } from "@chakra-ui/react";
import {Badges} from "./Badges";
export function Employee() {
    const { id } = useParams();
    const { data,isLoading,isError } = useQuery(["employee", id], async () => {
        const response = await fetch(`http://localhost:3030/employees/${id}`)
        return response.json();
    });

    if (isLoading || isError) return null;

    return (
      <>
        <HStack spacing={10} alignItems="left" justifyContent="left">
          <Image
            boxSize="175px"
            src={`http://localhost:3030/${data.imageFilePath}`}
            alt={`${data.firstName} ${data.lastName}`}
          />
          <VStack alignItems="left">
            <HStack>
              <Heading fontSize="4xl">{data.firstName}</Heading>
              <Text fontSize="2xl">{data.lastName}</Text>
            </HStack>
            <HStack alignItems="baseline">
              <Text fontSize="xl" textAlign="right">
                {data.jobTitle}</Text>
              <Text>|</Text>
              <Text fontSize="md" textAlign="right">
                {data.teamName}</Text>
            </HStack></VStack>
          <Text color="white" /></HStack>
        <Badges employee={data}/>
        </>);}
    

   