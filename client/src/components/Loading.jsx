import { Spinner } from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";

export function Loading(){
  const isFetching=useIsFetching();

  return (<Spinner
   zIndex={5} 
  size="sm" 
  pos="fixed"
  aria-label="loading"
  left= {0}
  right={0}
  top={0}
  display={isFetching > 0 ? "inherit" : "none"}
  bottom={0} 
  margin="auto" />
  )
}