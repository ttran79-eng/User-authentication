"use server";
import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";
import { redirect } from "next/navigation";
import { createAuthSession } from "@/lib/auth";

export async function signup( prevState,formData){
    const email = formData.get("email");
    const password = formData.get("password");



    // validate data

    let errors = {};

    if(!email.includes('@')){
        errors.email = "Please enter a valid email."
    }

    if(password.trim().length < 8){
        errors.password = "Password must be atleast 8 characters long."
    }


    if(Object.keys(errors).length > 0){
        return{
            errors: errors
        }
    }

    // store it in the dabatase (create a new user)//hashing password for security
    const hashedPassword = hashUserPassword(password);

    try{
    const id = createUser(email, hashedPassword);
       await createAuthSession(id);
                              redirect('/training');
    } catch (error) {
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            return {
                errors:{
                    email: 'It seems that this email is already registered. Use a different email'
                }
            };
        }
        throw error; // re-throw the error if it's not a constraint violation
    }




}