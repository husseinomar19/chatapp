import Image from "next/image"
import search from "../../image/zoeken.png"
import avater from "../../image/useravatar.png"
export default function Users(){
    return(
        <>
         <div className="users_content w-2/6 flex flex-col gap-5">
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
                <h2 className="font-bold text-xl">People</h2>
                <div className="users_ithems ">

                    {/* user single ithems */}
                    <div className="single_user flex justify-between items-center py-3">

                        <div className="user_image flex justify-center items-center gap-2">
                            <Image  className="rounded-full object-cover"
                            src={avater}
                            width={40}
                            height={40}
                            alt="user avatar"/>
                            <div className="user_naam">
                            <h2 className="font-bold text-sm">Friends Forever</h2>
                            <p className="text-pcolor text-xs">Hahahahah!</p>
                            </div>

                        </div>

                       <div className="user_update flex flex-col">
                        <p className="text-pcolor text-sm">Today, 9.52pm</p>
                        <p className="px-1 bg-notiti w-fit h-fit rounded-full text-white text-xs self-end">4</p>
                       </div>

                    </div>
                    


                    <div className="single_user flex justify-between items-center py-3">

                        <div className="user_image flex justify-center items-center gap-2">
                            <Image  className="rounded-full object-cover"
                            src={avater}
                            width={40}
                            height={40}
                            alt="user avatar"/>
                            <div className="user_naam">
                            <h2 className="font-bold">Friends Forever</h2>
                            <p className="text-pcolor text-xs">Hahahahah!</p>
                            </div>

                        </div>

                       <div className="user_update flex flex-col">
                        <p className="text-pcolor text-sm">Today, 9.52pm</p>
                        <p className="px-1 bg-notiti w-fit h-fit rounded-full text-white text-xs self-end">4</p>
                       </div>

                    </div>


                    <div className="single_user flex justify-between items-center py-3">

                        <div className="user_image flex justify-center items-center gap-2">
                            <Image  className="rounded-full object-cover"
                            src={avater}
                            width={40}
                            height={40}
                            alt="user avatar"/>
                            <div className="user_naam">
                            <h2 className="font-bold">Friends Forever</h2>
                            <p className="text-pcolor text-xs">Hahahahah!</p>
                            </div>

                        </div>

                       <div className="user_update flex flex-col">
                        <p className="text-pcolor text-sm">Today, 9.52pm</p>
                        <p className="px-1 bg-notiti w-fit h-fit rounded-full text-white text-xs self-end">4</p>
                       </div>

                    </div>
                    <div className="single_user flex justify-between items-center py-3">

                        <div className="user_image flex justify-center items-center gap-2">
                            <Image  className="rounded-full object-cover"
                            src={avater}
                            width={40}
                            height={40}
                            alt="user avatar"/>
                            <div className="user_naam">
                            <h2 className="font-bold">Friends Forever</h2>
                            <p className="text-pcolor text-xs">Hahahahah!</p>
                            </div>

                        </div>

                       <div className="user_update flex flex-col">
                        <p className="text-pcolor text-sm">Today, 9.52pm</p>
                        <p className="px-1 bg-notiti w-fit h-fit rounded-full text-white text-xs self-end">4</p>
                       </div>

                    </div>
                    <div className="single_user flex justify-between items-center py-3">

                        <div className="user_image flex justify-center items-center gap-2">
                            <Image  className="rounded-full object-cover"
                            src={avater}
                            width={40}
                            height={40}
                            alt="user avatar"/>
                            <div className="user_naam">
                            <h2 className="font-bold">Friends Forever</h2>
                            <p className="text-pcolor text-xs">Hahahahah!</p>
                            </div>

                        </div>

                       <div className="user_update flex flex-col">
                        <p className="text-pcolor text-sm">Today, 9.52pm</p>
                        <p className="px-1 bg-notiti w-fit h-fit rounded-full text-white text-xs self-end">4</p>
                       </div>

                    </div>
                    <div className="single_user flex justify-between items-center py-3">

                        <div className="user_image flex justify-center items-center gap-2">
                            <Image  className="rounded-full object-cover"
                            src={avater}
                            width={40}
                            height={40}
                            alt="user avatar"/>
                            <div className="user_naam">
                            <h2 className="font-bold">Friends Forever</h2>
                            <p className="text-pcolor text-xs">Hahahahah!</p>
                            </div>

                        </div>

                       <div className="user_update flex flex-col">
                        <p className="text-pcolor text-sm">Today, 9.52pm</p>
                        <p className="px-1 bg-notiti w-fit h-fit rounded-full text-white text-xs self-end">4</p>
                       </div>

                    </div>
                    <div className="single_user flex justify-between items-center py-3">

                        <div className="user_image flex justify-center items-center gap-2">
                            <Image  className="rounded-full object-cover"
                            src={avater}
                            width={40}
                            height={40}
                            alt="user avatar"/>
                            <div className="user_naam">
                            <h2 className="font-bold">Friends Forever</h2>
                            <p className="text-pcolor text-xs">Hahahahah!</p>
                            </div>

                        </div>

                       <div className="user_update flex flex-col">
                        <p className="text-pcolor text-sm">Today, 9.52pm</p>
                        <p className="px-1 bg-notiti w-fit h-fit rounded-full text-white text-xs self-end">4</p>
                       </div>

                    </div>
                    <div className="single_user flex justify-between items-center py-3">

                        <div className="user_image flex justify-center items-center gap-2">
                            <Image  className="rounded-full object-cover"
                            src={avater}
                            width={40}
                            height={40}
                            alt="user avatar"/>
                            <div className="user_naam">
                            <h2 className="font-bold">Friends Forever</h2>
                            <p className="text-pcolor text-xs">Hahahahah!</p>
                            </div>

                        </div>

                       <div className="user_update flex flex-col">
                        <p className="text-pcolor text-sm">Today, 9.52pm</p>
                        <p className="px-1 bg-notiti w-fit h-fit rounded-full text-white text-xs self-end">4</p>
                       </div>

                    </div>
                    
 

                   


                    {/* Eind user single thems */}
                </div>
            </div>
         </div>
        </>
    )
}