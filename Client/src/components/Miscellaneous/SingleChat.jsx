import { useEffect, useState } from "react";
import "./Style/style.css";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/chat-logics";
import { ProfileModal } from "../Miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { api } from "../../utils/helper";
import { ScrollableChats } from "../scrollableFiles/ScrollableChats";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8080"; // Backend endpoint
let selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [socket, setSocket] = useState(null); // Use state for socket instance

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    newSocket.emit("setup", user);

    newSocket.on("connected", () => setSocketConnected(true));
    newSocket.on("error", (err) => console.error("Socket error:", err));

    return () => {
      newSocket.disconnect(); // Cleanup socket on component unmount
    };
  }, [user]);

  // Fetch Messages
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await api.get(`/message/${selectedChat._id}`);
      setMessages(data);
      setLoading(false);

      // Emit room joining after fetching messages
      if (socket) {
        socket.emit("join chat", selectedChat._id);
      }
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the messages.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    if (selectedChat) fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // Send a Message
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const { data } = await api.post("/message", {
          content: newMessage,
          chatId: selectedChat._id,
        });

        setNewMessage("");
        // Emit new message to the room
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the message.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    if (!socket) return;

    const messageListener = (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        console.log("New message in another chat:", newMessageReceived);
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    };

    socket.on("message received", messageListener);

    return () => {
      socket.off("message received", messageListener);
    };
  }, [socket, selectedChatCompare]);

  // Typing Handler
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // Add typing indicator logic here if needed
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb="3"
            px="2"
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p="3"
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflow="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChats messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message..."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb="3" fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
