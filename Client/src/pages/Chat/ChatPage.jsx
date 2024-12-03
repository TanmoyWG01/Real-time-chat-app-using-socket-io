// import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import "./chat.css";
import SideDrawer from "../../components/Miscellaneous/sideDrawer";
import MyChats from "../../components/Miscellaneous/MyChats";
import ChatBox from "../../components/Miscellaneous/ChatBox";
import { useState } from "react";
// import axios from "axios";

const ChatPage = () => {
  // const [chats, setChats] = useState([]);

  // const fetchChats = async () => {
  //   const { data } = await axios.get("/api/chat");
  //   setChats(data);
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  const { user } = ChatState();

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
