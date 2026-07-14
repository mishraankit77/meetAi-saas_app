"use client";

import {Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {useState} from 'react';
import { authClient } from '@/lib/auth-client';
function Page() {
  const {data : session} = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name
    },{
      onError:() => {
       window.alert("Error signing up");
      },
      onSuccess: () => {
        window.alert("Successfully signed up");
      }
    });
  }
  if(session){
    return(
      <div className='flex flex-col gap-4 w-100 mx-auto mt-20'>
        <h1>Welcome {session.user.name}</h1>
        <Button variant="destructive" onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }
  return (
   <div className='flex flex-col gap-4 w-100 mx-auto mt-20'>
    <Input placeholder="Name" 
    value={name} 
    onChange={(e) => setName(e.target.value)} />
    <Input placeholder="Email"
     value={email}
      onChange={(e) => setEmail(e.target.value)} />
    <Input placeholder="Password"
     type="password" 
     value={password} 
     onChange={(e) => setPassword(e.target.value)} />
     <Button variant="destructive" onClick={onSubmit}>
      Submit
     </Button>
   </div>
  )
}

export default Page
