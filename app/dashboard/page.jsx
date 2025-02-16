
import { UserButton } from '@clerk/nextjs';
import Navbar from '../_components/Navbar';

const page = () => {
  return (
   <>
      <div>
      <Navbar
        customButton={
          <UserButton showName />
        }
      />
      </div>
      <div>
          
      </div>
    </>
  )
}

export default page
