import { useQuery } from "@tanstack/react-query";
import { SimpleGrid,Heading } from "@chakra-ui/react";
import { EmployeeResult } from "./EmployeeResult";
import { useSearchTerm } from "../hooks/useSearchTerm";


export function SearchResults(){
  const [searchTerm] = useSearchTerm();
  
  const { data: searchResults, isLoading, isError } = useQuery(
      ["search", searchTerm],
      async () => {
        const response = await fetch(
          `http://localhost:3030/employees?q=${searchTerm}`
        );
        return response.json();
      }
    );

    if (isLoading || isError) return null;

     return (
        <>
        <Heading>
            {searchTerm ? "Search Results" : "All Employees"}({searchResults.length})
        </Heading>
        <SimpleGrid>
        {searchResults.map((employee) => (
          <EmployeeResult key={employee.id} employee={employee} />
        ))}
      </SimpleGrid>
        </>
     )
}