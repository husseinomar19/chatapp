import { useState, useEffect } from "react";
import Image from "next/image";
import search from "../../image/zoeken.png";
import avater from "../../image/useravatar.png";
import { collection, getDocs, doc, setDoc, query, where, getDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

interface User {
  id: string;
  uid: string;
  naam: string;
  email: string;
  photoURL?: string;
  lastActive?: any;
}

interface UsersProps {
  setActiveChatId: (chatId: string) => void;
}

export default function Users({ setActiveChatId }: UsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);

  const fetchUsers = async (loggedInUid: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData: User[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      const filteredUsers = userData.filter((user) => user.uid !== loggedInUid);

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
        fetchUsers(user.uid);
      } else {
        console.log("No user logged in!");
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.naam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createOrGetChat = async (otherUserUid: string) => {
    try {
      if (!currentUserUid) return;

      const chatId =
        currentUserUid < otherUserUid
          ? `${currentUserUid}_${otherUserUid}`
          : `${otherUserUid}_${currentUserUid}`;

      const chatRef = doc(db, "chats", chatId);
      const chatDoc = await getDoc(chatRef);

      if (!chatDoc.exists()) {
        await setDoc(chatRef, {
          participants: [currentUserUid, otherUserUid],
          lastMessage: null,
        });
      }

      // Pass chatId to the parent component (Home)
      setActiveChatId(chatId);
    } catch (error) {
      console.error("Error creating/fetching chat:", error);
    }
  };

  return (
    <div className="users_content w-2/6 flex flex-col gap-5">
      <div className="user_zoeken relative">
        <Image
          className="absolute zoeken_img cursor-pointer"
          src={search}
          height={20}
          width={20}
          alt="search"
        />
        <input
          className="w-full py-3 px-10 outline-none"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="users bg-white p-3 h-full overflow-auto">
        <h2 className="font-bold text-xl">People</h2>
        <div className="users_items">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="single_user flex justify-between items-center py-3 cursor-pointer"
              onClick={() => createOrGetChat(user.uid)}
            >
              <div className="user_image flex justify-center items-center gap-2">
                <Image
                  className="rounded-full object-cover"
                  src={user.photoURL || avater}
                  width={40}
                  height={40}
                  alt="user avatar"
                />
                <div className="user_naam">
                  <h2 className="font-bold text-sm">{user.naam}</h2>
                  <p className="text-pcolor text-xs">{user.email}</p>
                </div>
              </div>

              <div className="user_update flex flex-col">
                <p className="text-pcolor text-xs">
                  Last Active:{" "}
                  {user.lastActive?.toDate().toLocaleString() || "Unknown"}
                </p>
                <p className="px-1 bg-blu text-xs rounded text-white">Online</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
