import Image from "next/image"
import search from "../../image/zoeken.png"
export default function Users(){
    return(
        <>
         <div className="users_content w-2/6 p-2 flex flex-col gap-5">
            <div className="user_zoeken relative">
                <Image className="absolute zoeken_img cursor-pointer"
                src={search}
                height={20}
                width={20}
                alt="search"
                 />
                <input className=" w-full py-3 px-10 outline-none" type="text"  placeholder="Search"/>
            </div>

            <div className="users bg-white p-3">
                <h2 className="font-bold">People</h2>
                
            </div>
         </div>
        </>
    )
}