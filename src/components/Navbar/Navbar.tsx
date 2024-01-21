import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import DashboardImg from '../../assets/navbar-logo.png';
import DashboardUserImg from '../../assets/dashboard-user-icon.png';
import { useEffect, useState, useRef } from 'react';

const Navbar = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [userEmail, setUserEmail] = useState('');

  /**@param _event,session
   * @returns event performed by the user in this case Sign Out
   * purpose realtime navbar username update
   */
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email || '');
    });
  }, []);

  const showProfileDropDown = () => {
    setShowProfile(true);
  };

  const profileDropdown = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      showProfile &&
      profileDropdown.current &&
      !profileDropdown.current.contains(e.target as Node)
    ) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfile]);

  const handleProfileClick = () => {
    navigate('/Profile');
    setShowProfile(false);
    setShowMobileMenu(false);
  };

  const handleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleNavLinkClick = () => {
    setShowMobileMenu(false);
  };

  const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    } else {
      localStorage.removeItem('token');
      navigate('/');
    }
    setShowProfile(false);
    setShowMobileMenu(false);
  };

  return (
    <>
      <div className="min-h-full sticky top-0 z-10">
        <nav className="bg-gray-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="flex items-center font-bold text-white gap-2 flex-shrink-0 cursor-pointer"
                >
                  <img
                    className="h-8 w-8"
                    src={DashboardImg}
                    alt="Your Company"
                  />{' '}
                  Poll App
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      to="/Dashboard"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium active:bg-gray-900 active:text-white"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/Feeds"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium active:bg-gray-900 active:text-white"
                    >
                      Feeds
                    </Link>
                  </div>
                </div>
              </div>

              {/* Profile Dropdown for tab view and above */}
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="relative ml-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">{userEmail}</span>
                      <button
                        type="button"
                        className="relative flex max-w-xs p-1 items-center rounded-full focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={showProfileDropDown}
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={DashboardUserImg}
                          alt="Profile"
                        />
                      </button>
                    </div>
                    {showProfile && (
                      <div
                        ref={profileDropdown}
                        className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex={-1}
                      >
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-0"
                          onClick={handleProfileClick}
                        >
                          My Profile
                        </span>
                        <Link
                          to="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-1"
                        >
                          Settings
                        </Link>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-2"
                          onClick={handleLogOut}
                        >
                          Sign out
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Profile Dropdown for tab view and above */}

              <div className="-mr-2 flex md:hidden">
                {/* <!-- Mobile menu button --> */}
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={handleMobileMenu}
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>

                  {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Mobile menu, show/hide based on menu state. --> */}
          {showMobileMenu && (
            <div className="md:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <Link
                  onClick={handleNavLinkClick}
                  to="/Dashboard"
                  className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium active:bg-gray-900 active:text-white"
                  aria-current="page"
                >
                  Dashboard
                </Link>

                <Link
                  onClick={handleNavLinkClick}
                  to="/Feeds"
                  className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium active:bg-gray-900 active:text-white"
                >
                  Feeds
                </Link>
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={DashboardUserImg}
                      alt="My Profile"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      Username but not inserted the username in supabase
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {userEmail}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <span
                    onClick={handleProfileClick}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    My Profile
                  </span>
                  <Link
                    to="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </Link>
                  <span
                    onClick={handleLogOut}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </span>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
