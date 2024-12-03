import "./home.css";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../../components/authentication/Login/Login";
import SignUp from "../../components/authentication/SignUp/SignUp";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const HomePage = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   try {
  //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     if (userInfo) {
  //       navigate("/chats");
  //     } else {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Error parsing user info from localStorage", error);
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>
                <Login />
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                <SignUp />
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
