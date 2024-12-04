import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chat-logics";
import { ChatState } from "../../Context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
// import { Tooltip } from "../ui/tooltip";

export const ScrollableChats = ({ messages }) => {
  const { user } = ChatState();

  // console.log(messages);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id || i}>
            {m.sender &&
              (isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name || "Unknown"}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name || "Unknown"}
                    // src={m.sender.pic || ""}
                  />
                </Tooltip>
              )}

            <span
              style={{
                background: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,

                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                // wordWrap: "break-word",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};
