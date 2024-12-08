"use server";

import { createClient } from "@/utils/supabase/server";
import {v4 as uuidv4} from "uuid";

export async function register(prevState:any, formData: FormData){

  try{
    const email = formData.get("email") as string | null;
    const fullname = formData.get("fullname") as string | null;
    const password = formData.get("password") as string | null;
    const profileImage = formData.get("ProfileImage") as File;
    const profile_uuid = uuidv4();
  
  
    const supabase = await createClient();
  
    
    const {error : uploadError} = await supabase.storage.from('attachments').upload(profile_uuid, profileImage)
  
    if(uploadError){
      console.log("error",uploadError);
      return {message:"upload error"};
    }
  
    const {data : uploadData} = supabase.storage.from('attachments').getPublicUrl(profile_uuid)
    const publicUrl = uploadData.publicUrl;
  
    // console.log(data.publicUrl)
  
  
    console.log('Upload profile successful!', publicUrl)
  
    
    // console.log(formData)
    
    const { data: userData, error : insertError } = await supabase
      .from('users')
      .insert([
        { email , fullname , password, attachment: publicUrl},]);
  
    if(insertError){
      console.log('found some error',insertError);
      return {message:"insert error"}; 
    }
  
    console.log("Regiter successful!");
    
    return {success:true, message:"register success"}

  }catch(error){
    console.log("error", error)
    return {message:"internal server error"}
  }

  
  
}