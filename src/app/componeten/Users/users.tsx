import { useState, useEffect } from "react";
import Image from "next/image";
import search from "../../image/zoeken.png";
import avater from "../../image/useravatar.png";
import { collection, getDocs } from "firebase/firestore";
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

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null); // Huidige gebruiker

  const fetchUsers = async (loggedInUid: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData: User[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      // Filter ingelogde gebruiker eruit
      const filteredUsers = userData.filter((user) => user.uid !== loggedInUid);

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid); // Stel huidige gebruiker in
        fetchUsers(user.uid); // Haal gebruikers op behalve de ingelogde
      } else {
        console.log("Geen gebruiker ingelogd!");
      }
    });

    // Cleanup de listener wanneer de component unmount
    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.naam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
                className="single_user flex justify-between items-center py-3"
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
                  <p className="px-1 bg-notiti w-fit h-fit rounded-full text-white text-xs self-end">
                    4
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
