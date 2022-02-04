import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getLoggedUserName } from "../api/api";
import { ProfileDetailContext } from "../context/MainContext";
import { v4 as uuidv4 } from "uuid";

const Chat: React.FC = () => {
  const socket = io("http://localhost:3001");
  const { hideChat, setHideChat, chatWithMe, setChatWithMe } =
    useContext(ProfileDetailContext);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("unLoggedId");
  const [userName, setUserName] = useState(uuidv4());
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
    setTextAreaInput(evt.target.value);
  };

  const pushToChat = (
    arr: [obj: { [key: string]: string }, chater: string]
  ) => {
    let date = new Date();
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
    console.log(unique([...newArrOfObj], "chater", "name", "time", "message"));
    let filteredNewArr = unique(
      [...newArrOfObj],
      "chater",
      "name",
      "time",
      "message"
    ) as {
      message: string;
      name: string;
      time: string;
      chater: string;
    }[];
    setChatArrObj([...filteredNewArr]);
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
        {
          message: textAreaInput,
          name: loggedIn ? userName : "anonymous",
        },
        chatWithMe ? chatWithMe : loggedIn ? userId : userId
      );
      pushToChat([{ [loggedIn ? userName : "Me"]: textAreaInput }, "first"]);

      // console.log(chatArrObj);
    }
  };

  socket.on(
    "get-message-fromRoom",
    (messageData: { message: string; name: string }) => {
      console.log(messageData.message);
      setChatObj({ [messageData.name]: messageData.message });
    }
  );

  //handle messages that are comming to client
  useEffect(() => {
    const textMsgArr = Object.values(chatObj);
    if (
      textMsgArr[0] !== textAreaInput &&
      chatObj[userName] == textMsgArr[textMsgArr.length]
    ) {
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
        console.log(data);
        setUserId(data.sellerId);
        setLoggedIn(true);
        socket.emit("join-room", data.sellerId);
        setJoined(true);
      } else {
        setLoggedIn(false);
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

  useEffect(() => {
    console.log("chatWithMe");
    if (chatWithMe !== undefined) {
      socket.emit("join-room", chatWithMe);
    }
  }, [chatWithMe]);

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
              <h3>{loggedIn ? userName : "guest"}</h3>
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

function unique(
  arrOfObj: {}[],
  prop: string,
  prop2: string,
  prop3: string,
  prop4: string
) {
  let newArr: {}[] = [];
  arrOfObj.forEach((val: any) => {
    if (
      undefined ===
      newArr.find(
        (value: any) =>
          JSON.stringify(value[prop]) === JSON.stringify(val[prop]) &&
          JSON.stringify(value[prop2]) === JSON.stringify(val[prop2]) &&
          JSON.stringify(value[prop3]) === JSON.stringify(val[prop3]) &&
          JSON.stringify(value[prop4]) === JSON.stringify(val[prop4])
      )
    ) {
      newArr.push(val);
    }
  });
  return newArr;
}
