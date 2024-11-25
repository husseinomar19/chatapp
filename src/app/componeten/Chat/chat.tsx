import Image from "next/image"
import useravater from "../../image/useravatar.png"
import bellen from "../../image/telefoon.png"
import camera from "../../image/camera_icon.png"
import menu from "../../image/menu_icon.png"
import file from "../../image/file.png"
import emo from "../../image/imogi.png"
import came from "../../image/came.png"
import mic from "../../image/mic.png"
export default function chat(){
    return(
        <>
        <div className="chat_content w-3/5 bg-white py-5 px-7 h-full">

        <div className="headerchat flex justify-between items-center pb-3">
            {/* Useravater info */}
            <div className="header_ithems flex justify-center items-center gap-3">
                <Image className="rounded-full"
                src={useravater}
                width={47}
                height={47}
                alt="UserAvater" /> 
                <div className="user_info_chat">
                    <h2 className="font-bold text-xl">Anil</h2>
                    <p className="text-pcolor text-xs">Online - Last seen, 2.02pm</p>
                </div> 
            </div>
            {/* Eind Info */}
            <div className="contact_icon flex justify-center items-center gap-5">
                <Image className="object-cover cursor-pointer"
                src={bellen} 
                width={28}
                height={28}
                alt="contact Icon"/>
                <Image className="object-cover cursor-pointer"
                src={camera} 
                width={40}
                height={40}
                alt="contact Icon"/>
                <Image className="object-cover cursor-pointer"
                src={menu} 
                width={30}
                height={30}
                alt="contact Icon"/>
            </div>



        </div>

        {/* Eind header user info */}
        <div className="massage_content h-4/5 overflow-auto py-3 flex flex-col gap-2">

       <div className="user_chat_content">
       <p className="user_items_chat px-5 py-2 bg-pmassage w-fit rounded-xl">Hey There!</p>
       <p className="text-pcolor text-xs mt-1">Today, 8.20pm</p>
       </div>

        <div className="me_chat_content self-end">
        <p className="me_user_chat px-5 py-2 bg-menuground w-fit rounded-xl text-white">Hello!</p>
        <p className="text-pcolor text-xs mt-1">Today, 8.30pm</p>
        </div>

        <div className="me_chat_content self-end">
        <p className="me_user_chat px-5 py-2 bg-menuground w-fit rounded-xl text-white">How are you?</p>
        <p className="text-pcolor text-xs mt-1">Today, 8.31pm</p>
        </div>
        
         
        </div>

        {/* Chat content */}

        {/* Eind chat content */}


        {/* chat form */}
        <div className="sendchatform flex w-full gap-2">
            <div className="send_form px-5 py-4 flex justify-start items-center w-full">
              <div className="send_file flex-1">
                <Image className="object-cover cursor-pointer"
                src={file}
                width={20}
                height={20}
                alt="send file" />
              </div>

              <div className="sendchatinput">
                <input className="outline-none" type="text" placeholder="Type your message here..." />
              </div>

              <div className="emoijs flex justify-center items-center gap-3">
               <Image className="object-cover cursor-pointer"
               src={emo}
               width={20}
               height={20}
               alt="emoijs" />
               <Image className="object-cover cursor-pointer"
               src={came}
               width={22}
               height={22}
               alt="emoijs" />
              </div>
            </div>


            <div className="mic bg-menuground  flex justify-center items-center px-4 rounded-xl">
                <Image className="object-cover cursor-pointer"
                src={mic}
                width={15}
                height={15}
                alt="Mic" />
            </div>
        </div>
        {/* Eind Chat form */}

        </div>
        </>
    )
}