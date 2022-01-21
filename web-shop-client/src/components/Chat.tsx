import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getLoggedUserName } from "../api/api";
import { ProfileDetailContext } from "../context/MainContext";

const Chat: React.FC = () => {
  const socket = io("http://localhost:3001");
  const { hideChat, setHideChat, setRerender, rerender } =
    useContext(ProfileDetailContext);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("unLoggedId");
  const [userName, setUserName] = useState("guest");
  const [joined, setJoined] = useState(false);
  const [chatObj, setChatObj] = useState<{ [key: string]: string }>({ "": "" });
  const [chatArrObj, setChatArrObj] = useState<
    {
      message: string;
      name: string;
      time: string;
      chater: string;
    }[]
  >([]);

  const [textAreaInput, setTextAreaInput] = useState("");

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (evt.target.value.length !== 0) {
      setTextAreaInput(evt.target.value);
    }
  };

  const pushToChat = (
    arr: [obj: { [key: string]: string }, chater: string]
  ) => {
    let date = new Date();
    // let stringDate = JSON.stringify(date.toDateString());
    let stringTime = JSON.stringify(date.toTimeString())
      .split(" ")[0]
      .split('"')[1];
    let newArrOfObj = chatArrObj;
    newArrOfObj.push({
      name: Object.keys(arr[0])[0],
      message: Object.values(arr[0])[0],
      time: stringTime,
      chater: arr[1],
    });
    setChatArrObj([...newArrOfObj]);
  };

  const renderChat = () => {
    return chatArrObj.map(
      (
        {
          message,
          name,
          time,
          chater,
        }: { message: string; name: string; time: string; chater: string },
        i
      ) => {
        return (
          <div className={`Chat__body--${chater}`} key={i}>
            <nav>
              <p>{name}</p>
              <p>{time}</p>
            </nav>
            <p>{message}</p>
          </div>
        );
      }
    );
  };

  const sendMessage = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (textAreaInput.length !== 0) {
      socket.emit(
        "send-message",
        { message: textAreaInput, name: userName },
        userId
      );
      pushToChat([{ [userName]: textAreaInput }, "first"]);

      // console.log(chatArrObj);
    }
  };

  socket.on(
    "get-message-fromRoom",
    (messageData: { message: string; name: string }) => {
      const textMsgArr = Object.values(chatObj);
      // if (textMsgArr[0] !== textAreaInput) {
      // console.log({ [messageData.name]: messageData.message });
      setChatObj({ [messageData.name]: messageData.message });
      // }
    }
  );

  useEffect(() => {
    const textMsgArr = Object.values(chatObj);
    if (textMsgArr[0] !== textAreaInput) {
      pushToChat([chatObj, "second"]);
    }
    setTextAreaInput("");
  }, [chatObj]);

  useEffect(() => {
    (async function getUserName() {
      let { data } = await getLoggedUserName();
      if (data.name !== undefined) {
        // console.log(data);
        setUserName(data.name);
        setUserId(data.Id);
        setLoggedIn(true);
        socket.emit("join-room", data.Id);
        setJoined(true);
        // window.location.reload();
      } else {
        setLoggedIn(false);

        // window.location.reload();
      }
    })();
    if (chatArrObj.length === 0) {
      pushToChat([
        { ["Admin-message"]: "Please type anything to send message to a user" },
        "second",
      ]);
    }
    if (!joined && !loggedIn) {
      socket.emit("join-room", userId);
      setJoined(true);
    }
  }, [loggedIn]);
  return (
    <div className={`${hideChat ? "Chat-hide" : "Chat"}`}>
      <nav className={`${hideChat ? "Chat-hide__nav" : "Chat__nav"}`}>
        <i
          className={`Chat${
            hideChat ? "-hide" : ""
          }__nav--logo fab fa-shopware`}
        ></i>
        <h3
          onClick={() => {
            setHideChat(!hideChat);
          }}
        >
          Chat with us
        </h3>
        <div className={`Chat${hideChat ? "-hide" : ""}__nav--icons`}>
          {!hideChat ? (
            <i
              onClick={() => {
                setHideChat(!hideChat);
              }}
              className="fas fa-chevron-down"
            ></i>
          ) : (
            <i
              onClick={() => {
                setHideChat(!hideChat);
              }}
              className="fas fa-chevron-up"
            ></i>
          )}
          <i className="fas fa-times"></i>
        </div>
      </nav>
      {!hideChat && (
        <>
          <div className="Chat__header">
            <div className="Chat__header--chater">
              <h3>{userName}</h3>
              <p>I am here to help you</p>
            </div>
          </div>
          <div className="Chat__body">{renderChat()}</div>
          <div className="Chat__footer">
            <textarea
              onChange={handleChange}
              placeholder="type your message"
              value={textAreaInput}
            ></textarea>
            <button onSubmit={sendMessage} onClick={sendMessage}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Chat);

/* const [firstChater, setFirstChater] = useState<{}[]>([
  { admin: "Hi how can i help you, ask me anything" },
  { admin: "don't wory, you just need to folow these instructions" },
]);
const [secondChater, setSecondChater] = useState<{}[]>([
  { TrusT: "I need to ad some products into my shop" },
  { TrusT: "I tried to ad but stuck into implementation" },
]); */

/*   const switchInput = () => {
    let firstLength = Math.floor(Math.random() * firstChater.length);
    let secondLength = Math.floor(Math.random() * secondChater.length);
    let randomChoise = [
      [firstChater[firstLength], "first"],
      [secondChater[secondLength], "second"],
    ][Math.floor(Math.random() * 2)];
    return randomChoise as [obj: { [key: string]: string }, chater: string];
  }; */
