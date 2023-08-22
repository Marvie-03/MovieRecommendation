import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebase'
import {createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
const AuthContext = createContext()

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({})

    async function signUp(email, password) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, 'users', email), {
            savedShows: [],
          });
        } catch (error) {
          console.error('Error signing up:', error);
          // You may want to handle the error and show a proper message to the user
        }
      }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)

    }
    function logOut(){
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
            setUser(currentUser)
        })
        return () =>{
            unsubscribe()
        }
    })
    return(
        <AuthContext.Provider value={{ signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}
export function UserAuth(){
    return useContext(AuthContext)
}