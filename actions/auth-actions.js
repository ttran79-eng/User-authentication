"use server";

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

    // store it in the dabatase (create a new user)
}