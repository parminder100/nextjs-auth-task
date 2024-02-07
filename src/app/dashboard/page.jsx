import UserInfo from "@/components/UserInfo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Dashboard = async() =>{
    const session = await getServerSession(authOptions);

    if(!session){
        redirect('/')
    }
    return(
        <>
            <UserInfo />
        </>
    )
}

export default Dashboard;