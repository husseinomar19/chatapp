"use client";
import "./style.css";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Users from "../componeten/Users/users";
import Chat from "../componeten/Chat/chat";
import Image from "next/image";
import home from "../image/home.png"
import loguit from "../image/loguit.png"
import setting from "../image/setting.png"
import nuti from "../image/notit.png"
import massage from "../image/massage.png"

export default function Home() {
  const cookie = new Cookies();
  const router = useRouter();
  const [userImage, setUserImage] = useState(null); // Houd de client-side toestand bij

  useEffect(() => {
    // Zorg ervoor dat deze code alleen op de client draait
    const token = cookie.get("user_token");
    const image = cookie.get("user_img");
    
    if (!token) {
      router.push("/");
    }
    setUserImage(image); // Update de client-side toestand
  }, [cookie, router]);

  if (!userImage) {
    return <div>Loading...</div>; // Toon een fallback totdat de client-data beschikbaar is
  }

  return (
    <>
      <div className="content flex justify-center items-center h-lvh w-full bg-background py-7 px-20">
        <div className="home flex h-full w-full gap-3">
          <div className="menu flex flex-col justify-between items-center bg-menuground p-4 rounded-xl text-white">
            <Image className="rounded-full object-cover"
              src={userImage}
              width={50}
              height={50}
              alt="UserImage"
            />
            <div className="menu_icon flex flex-col gap-10  mb-44">
                <Image className="object-cover cursor-pointer" 
                src={home}
                width={28}
                height={28}
                alt="Icon" />
                <Image className="object-cover cursor-pointer" 
                src={massage}
                width={28}
                height={28}
                alt="Icon" />
                <Image className="object-cover cursor-pointer" 
                src={nuti}
                width={28}
                height={28}
                alt="Icon" />
                <Image className="object-cover cursor-pointer" 
                src={setting}
                width={28}
                height={28}
                alt="Icon" />
            </div>
             <Image className="object-cover cursor-pointer"
             src={loguit}
             height={28}
             width={28}
             alt="LogUit" />
          </div>

          <Users />
          <Chat />

        </div>
      </div>
    </>
  );
}
