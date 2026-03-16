import { Container } from "@chakra-ui/react";
import { Routes,Route } from "react-router-dom";
import {Employee}from "./components/Employee";
import { Header } from "./components/Header";
import {SearchResults} from "./components/SearchResults";
import {Loading} from "./components/Loading"
import { ToastContainer } from "./components/Toast";

function App() {
  
    return (
    <>
    <Loading/>
      <Header />
      <Container pt="6" maxW="container.md">
        <Routes>
           <Route path="/" element={<SearchResults/>}/>
           <Route path="employees/:id" element= {<Employee/>} />
        </Routes>
      </Container>
      <ToastContainer/>
    </>
  );
}

export default App;
