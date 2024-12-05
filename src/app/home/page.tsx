"use client";
import "./style.css";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Users from "../componeten/Users/users";
import Chat from "../componeten/Chat/chat";
import Image from "next/image";
import home from "../image/home.png";
import loguit from "../image/loguit.png";
import setting from "../image/setting.png";
import nuti from "../image/notit.png";
import massage from "../image/massage.png";
import { auth } from "../../../firebaseconfig";
import { signOut } from "firebase/auth";
import Nuti from "../componeten/Nuti/nuti";
import Setting from "../componeten/Setting/setting";
import Landingpage from "../componeten/Landingpage/Landingpage";

export default function Home() {
  const cookie = new Cookies();
  const router = useRouter();
  const [userImage, setUserImage] = useState(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  const handellogout = async () => {
    try {
      await signOut(auth);
      cookie.remove("user_token");
      cookie.remove("user_img");
      cookie.remove("user_naam");
      console.log("User is logged out");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = cookie.get("user_token");
    const image = cookie.get("user_img");

    if (!token) {
      router.push("/");
    }
    setUserImage(image);
  }, [cookie, router]);

  if (!userImage) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <svg className="svg_loaing" viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  }

  //test siwcht

  const rendersection = () => {
    switch (activeSection) {
      case "massage":
        return (
          <>
            <Users setActiveChatId={setActiveChatId} />

            {activeChatId ? (
              <Chat chatId={activeChatId} />
            ) : (
              <div className="chat_content w-3/5 bg-white py-5 px-7 h-full flex justify-center items-center">
                <div className="loader">
                  <div className="box box0">
                    <div></div>
                  </div>
                  <div className="box box1">
                    <div></div>
                  </div>
                  <div className="box box2">
                    <div></div>
                  </div>
                  <div className="box box3">
                    <div></div>
                  </div>
                  <div className="box box4">
                    <div></div>
                  </div>
                  <div className="box box5">
                    <div></div>
                  </div>
                  <div className="box box6">
                    <div></div>
                  </div>
                  <div className="box box7">
                    <div></div>
                  </div>
                  <div className="ground">
                    <div></div>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      case "home":
        return (
          <>
            <Landingpage />
          </>
        );
      case "nuti":
        return (
          <>
            <Nuti />
          </>
        );
      case "setting":
        return (
          <>
            <Setting />
          </>
        );
      default:
        return (
          <>
            <Landingpage />
          </>
        );
    }
  };

  return (
    <>
      <div className="content flex justify-center items-center h-lvh w-full bg-background py-7 px-20">
        <div className="home flex h-full w-full gap-3">
          <div className="menu flex flex-col justify-between items-center bg-menuground p-4 rounded-xl text-white">
            <Image
              className="rounded-full object-cover"
              src={userImage}
              width={50}
              height={50}
              alt="UserImage"
            />
            <div className="menu_icon flex flex-col gap-10 mb-44">
              <Image
                className="object-cover cursor-pointer"
                src={home}
                width={28}
                height={28}
                alt="Icon"
                onClick={() => setActiveSection("home")}
              />
              <Image
                className="object-cover cursor-pointer"
                src={massage}
                width={28}
                height={28}
                alt="Icon"
                onClick={() => setActiveSection("massage")}
              />
              <Image
                className="object-cover cursor-pointer"
                src={nuti}
                width={28}
                height={28}
                alt="Icon"
                onClick={() => setActiveSection("nuti")}
              />
              <Image
                className="object-cover cursor-pointer"
                src={setting}
                width={28}
                height={28}
                alt="Icon"
                onClick={() => setActiveSection("setting")}
              />
            </div>
            <Image
              onClick={handellogout}
              className="object-cover cursor-pointer"
              src={loguit}
              height={28}
              width={28}
              alt="LogUit"
            />
          </div>
          {rendersection()}
        </div>
      </div>
    </>
  );
}
