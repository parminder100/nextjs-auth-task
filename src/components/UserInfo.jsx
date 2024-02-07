"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UserInfo = () =>{
    const {data:session, status} = useSession();
    console.log(session);

    const router = useRouter();
    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    return(
        <>
            <div className="grid place-items-center h-screen">
                <div className="shadow-lg p-8 b-zinc-300/10 flex flex-col gap-2 my-6">
                    <div>
                        Name:<span className="font-bold">{session?.user?.username}</span>
                    </div>
                    <div>
                        Email:<span className="font-bold">{session?.user?.email}</span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
                        >
                        Log Out
                    </button>
                </div>
            </div>
        </>
    )
}
export default UserInfo;