'use client'
import { useRouter } from 'next/navigation'

const HomePage = () => {
    const router = useRouter()
  // ... other component logic

const handleRedirect = () => {
    router.push('./Auth/')
};

return (
    <div>
    <div>Welcome to my homepage</div>
    <button  type="button" className=" text-center bg-violet-900  p-5" onClick={handleRedirect}>
        Click
    </button>
    </div>
);
};

export default HomePage;
