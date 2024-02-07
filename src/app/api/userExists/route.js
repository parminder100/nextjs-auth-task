import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(req){
    try{
        const {username} = await req.json();
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', username);
        console.log("user: ", user);
        return NextResponse.json({user});
    }
    catch(error){
        console.log(error);
    }
}