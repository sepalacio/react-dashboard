import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../context/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button type='button'
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray">
        <span style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
        {icon}
      </button>
  </TooltipComponent>
)

const toggleMenu = (prevActiveMenu) => !prevActiveMenu; 

export const Navbar = () => {
  const {
    setActiveMenu,
    isClicked,
    navbarItemClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  // Get initial screen size on first load [] this will only be called once
  useEffect(() => {
    const handleResize = (params) => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detects when the screen size changes and toggles the Sidebar
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  
  

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <div className='flex'>
        <NavButton title="Menu"
          customFunc={() => setActiveMenu(toggleMenu)}
          color="blue"
          icon={<AiOutlineMenu/>}
        />
        <NavButton title="Cart"
          customFunc={() => navbarItemClick('cart')}
          color="blue"
          icon={<FiShoppingCart/>}
        />
        <NavButton title="Chat"
          dotColor="#03C9D7"
          customFunc={() => navbarItemClick('chat')}
          color="blue"
          icon={<BsChatLeft/>}
        />
        <NavButton title="Notifications"
          dotColor="#03C9D7"
          customFunc={() => navbarItemClick('notification')}
          color="blue"
          icon={<RiNotification3Line/>}
        />

        <TooltipComponent
          content="profile"
          position='BottomCenter'>
          <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
            onClick={() => navbarItemClick('userProfile')}>
              <img src={ avatar } alt="" className="rounded-full w-8 h-8" />
              <p>
                <span className='text-gray-400 text-14'>Hi, </span>
                <span className='text-gray-400 font-bold ml-1 text-14'>Michael</span>
              </p>
              <MdKeyboardArrowDown className='text-gray-400 text-14 '/>
          </div>
        </TooltipComponent>

        { isClicked.cart && <Cart /> }
        { isClicked.chat && <Chat /> }
        { isClicked.notification && <Notification /> }
        { isClicked.userProfile && <UserProfile /> }
      </div>
    </div>
  )
}
