// src/components/Header.tsx
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <>
    <header className=" text-white py-4 px-8 border-b-2">
      <div className="container">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold">React Blog</Link>
          <div className='flex-1 flex justify-end items-center'>
            <Link to="/" className="mr-4 text-black dark:text-white">Home</Link>
          </div>
          <ThemeToggle/>
        </nav>
      </div>
    </header>
    </>
  );
};

export default Header;