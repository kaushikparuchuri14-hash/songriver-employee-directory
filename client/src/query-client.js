import { QueryClient } from "@tanstack/react-query";
import { toast } from "./components/Toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        toast({
          title: "Server Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    },
    mutations: {
      onError: (error) => {
        toast({
          title: "Server Error",
          description:error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    },
  },
});
