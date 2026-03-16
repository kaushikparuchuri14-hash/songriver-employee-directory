import {Button,Input,InputGroup,InputLeftElement,InputRightElement} from "@chakra-ui/react";
import {SearchIcon,CloseIcon} from "@chakra-ui/icons";
import { useSearchTerm } from "../hooks/useSearchTerm";
import { useNavigate } from "react-router";



export function SearchInput(){

    const [searchTerm,setSearchTerm]=useSearchTerm();
    const navigate = useNavigate();
    
  const handleInputChange = (e) => {
    const value = e.target.value;
      setSearchTerm(value);
  };

  const clearSearch = () => {
      setSearchTerm("");
  };

  const handleFocus= () =>{
    if(searchTerm){
      navigate(`/?q=${searchTerm}`)
    }
  } 
   return(
  <InputGroup onFocus={handleFocus}>
    <InputLeftElement children={<SearchIcon />} />
    <Input placeholder="search" value={searchTerm} onChange={handleInputChange} />
    {searchTerm && (
    <InputRightElement>
    <Button onClick={clearSearch}>
    <CloseIcon/>
    </Button>
    </InputRightElement>
    )}
  </InputGroup>
)
}
export default SearchInput;