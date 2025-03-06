"use client"
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import {provider ,auth,db} from "../../firebaseconfig"
import { signInWithPopup, User } from 'firebase/auth';
import { useState } from 'react';
import { setDoc, doc } from "firebase/firestore";
export default function LandingPage() {
const [error , setError] = useState('');
const router = useRouter();
const cookie = new Cookies();

  // Functie om gebruikersgegevens aan Firestore toe te voegen
  const addUser = async (user: User): Promise<void> => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        naam: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        lastActive: new Date(),
      });
      console.log("User successfully added to Firestore!");
    } catch (err) {
      console.error("Error adding user to Firestore:", err);
    }
  };

const googleHandel = async (event:React.MouseEvent<HTMLButtonElement>)=>{
  event.preventDefault();
  try{
  const result = await signInWithPopup(auth, provider)
   // Gebruikersinformatie ophalen
   const user = result.user;
   
  cookie.set('user_token', result.user.refreshToken);
  cookie.set('user_naam', result.user.displayName);
  cookie.set('user_img', result.user.photoURL);
  console.log(result);
  await addUser(user);
  
  router.push('/home');
  }catch(error){
    if(error instanceof Error){
    setError(error.message);
  }
  }

}
  return (
    <>
    <div className="content flex justify-center items-center h-dvh">
      <form className="form">
        <div className="flex-column">
          <label htmlFor="name">Name</label>
        </div>
        <div className="inputForm">
          <svg
            height="60"
            viewBox="0 -9 32 32"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path
                d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"
              />
            </g>
          </svg>
          <input id="name" type="text" className="input" placeholder="Enter your Name" />
        </div>

        <div className="flex-column">
          <label htmlFor="email">Email</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="0 0 32 32"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path
                d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"
              />
            </g>
          </svg>
          <input id="email" type="text" className="input" placeholder="Enter your Email" />
        </div>

        <div className="flex-column">
          <label htmlFor="password">Password</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="-64 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"
            />
            <path
              d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"
            />
          </svg>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="Enter your Password"
          />
        </div>

        <button type="submit" className="button-submit">Sign Up</button>
        <p className="p">
          Already have an account? <span className="span">login</span>
        </p>
        <div className="flex-row">
        <button className="btn google" onClick={googleHandel}>
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
  Google
</button>
        </div>
        {error && <span>{error}</span>}
      </form>
      </div>
    </>
  );
}
