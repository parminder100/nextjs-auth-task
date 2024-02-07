import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
const argon2 = require('argon2');

export async function POST(req){
    try{
        const {username, email, password} = await req.json();

        // Hash the password before storing it
        const hashedPassword = await argon2.hash(password, 10);
        
        console.log('Received data:', { username, email, hashedPassword });
        // Add user to the database
        await db.one(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        return NextResponse.json({message: 'User registered.'}, {status: 201});
    }
    catch(error){
        return NextResponse.json(
            {message: 'An error occured while registering the user.'}, {status: 500}
        );
    }
}