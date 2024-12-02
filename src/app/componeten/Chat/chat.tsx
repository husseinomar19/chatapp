import { useEffect, useState } from "react";
import Image from "next/image";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../../../firebaseconfig";
import useravatar from "../../image/useravatar.png";
import bellen from "../../image/telefoon.png";
import camera from "../../image/camera_icon.png";
import menu from "../../image/menu_icon.png";
import file from "../../image/file.png";
import emo from "../../image/imogi.png";
import came from "../../image/came.png";
import mic from "../../image/mic.png";
import { User } from "firebase/auth";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Timestamp;
}

interface ChatUser {
  uid: string;
  naam: string;
  email: string;
  photoURL?: string;
}

interface ChatProps {
  chatId: string;
}

export default function Chat({ chatId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chatPartner, setChatPartner] = useState<ChatUser | null>(null);

  // Fetch current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log("No user logged in!");
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch chat partner based on chatId
  useEffect(() => {
    if (!chatId || !currentUser) return;

    const [uid1, uid2] = chatId.split("_");
    const otherUid = uid1 === currentUser.uid ? uid2 : uid1;

    const fetchChatPartner = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", otherUid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setChatPartner({
            uid: userData.uid,
            naam: userData.naam,
            email: userData.email,
            photoURL: userData.photoURL,
          });
        }
      } catch (error) {
        console.error("Error fetching chat partner:", error);
      }
    };

    fetchChatPartner();
  }, [chatId, currentUser]);

  // Fetch messages from Firebase
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!chatId || !currentUser) return;

    try {
      const messagesRef = collection(db, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        text: newMessage,
        sender: currentUser.uid,
        timestamp: Timestamp.now(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat_content w-3/5 bg-white py-5 px-7 h-full">
      {/* Header with user information */}
      <div className="headerchat flex justify-between items-center pb-3">
        <div className="header_ithems flex justify-center items-center gap-3">
          <Image
            className="rounded-full"
            src={chatPartner?.photoURL || useravatar}
            width={47}
            height={47}
            alt="User Avatar"
          />
          <div className="user_info_chat">
            <h2 className="font-bold text-xl">
              {chatPartner ? chatPartner.naam : "Chat Partner"}
            </h2>
            <p className="text-pcolor text-xs">
              {chatPartner ? "Online - Last seen recently" : "Loading..."}
            </p>
          </div>
        </div>
        <div className="contact_icon flex justify-center items-center gap-5">
          <Image
            className="object-cover cursor-pointer"
            src={bellen}
            width={28}
            height={28}
            alt="Call Icon"
          />
          <Image
            className="object-cover cursor-pointer"
            src={camera}
            width={40}
            height={40}
            alt="Camera Icon"
          />
          <Image
            className="object-cover cursor-pointer"
            src={menu}
            width={30}
            height={30}
            alt="Menu Icon"
          />
        </div>
      </div>

      {/* Messages display */}
      <div className="massage_content h-4/5 overflow-auto py-3 flex flex-col gap-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.sender === currentUser?.uid
                ? "me_chat_content self-end"
                : "user_chat_content"
            }`}
          >
            <p
              className={`${
                message.sender === currentUser?.uid
                  ? "me_user_chat px-5 py-2 bg-menuground w-fit rounded-xl text-white"
                  : "user_items_chat px-5 py-2 bg-pmassage w-fit rounded-xl"
              }`}
            >
              {message.text}
            </p>
            <p className="text-pcolor text-xs mt-1">
              {message.timestamp?.toDate
                ? message.timestamp.toDate().toLocaleTimeString()
                : "Now"}
            </p>
          </div>
        ))}
      </div>

      {/* Chat form */}
      <div className="sendchatform flex w-full gap-2">
        <div className="send_form px-5 py-4 flex justify-start items-center w-full">
          <div className="send_file flex-1">
            <Image
              className="object-cover cursor-pointer"
              src={file}
              width={20}
              height={20}
              alt="send file"
            />
          </div>
          <div className="sendchatinput">
            <input
              className="outline-none"
              type="text"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
          </div>
          <div className="emoijs flex justify-center items-center gap-3">
            <Image
              className="object-cover cursor-pointer"
              src={emo}
              width={20}
              height={20}
              alt="Emojis"
            />
            <Image
              className="object-cover cursor-pointer"
              src={came}
              width={22}
              height={22}
              alt="Camera"
            />
          </div>
        </div>
        <div
          className="mic bg-menuground flex justify-center items-center px-4 rounded-xl cursor-pointer"
          onClick={sendMessage}
        >
          <Image
            className="object-cover cursor-pointer"
            src={mic}
            width={15}
            height={15}
            alt="Mic"
          />
        </div>
      </div>
    </div>
  );
}
