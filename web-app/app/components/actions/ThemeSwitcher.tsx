"use client"
import { useEffect } from 'react';
import { useSettingsContext } from '@/lib/context/settings/setting-context';
import { IconButton } from "@/lib/ui/MTFix"
import { MdNightsStay } from 'react-icons/md';
import { FaSun } from 'react-icons/fa';

const ThemeToggleSwitch = () => {
  const { theme, handleUpdate } = useSettingsContext();

  const isDark = theme === "dark" ? true : false

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDark]);

  // const darkStyle = (isDark ? "bg-primary-light dark:bg-primary-dark dark:text-white" : "") + " rounded-none bg-opacity-50 dark:bg-opacity-50 flex justify-start items-center gap-1";
  // const lightStyle = (!isDark ? "bg-primary-light dark:bg-primary-dark dark:text-white" : "") + " rounded-none bg-opacity-50 dark:bg-opacity-50 flex justify-start items-center gap-1";

  // return (
  //     <Menu >
  //       <MenuHandler>
  //         <IconButton variant='outlined' className='rounded-md' >
  //           <MdLightMode size={25} />
  //         </IconButton>
  //       </MenuHandler>
  //       <MenuList className='p-0'>
  //         <MenuItem
  //           className={darkStyle}
  //           onClick={() => handleUpdate("theme", "dark")}
  //         >
  //           <MdNightsStay /> 
  //           dark
  //         </MenuItem>
  //         <MenuItem
  //           className={lightStyle}
  //           onClick={() => handleUpdate("theme", "light")}
  //         >
  //           <FaSun />
  //           light
  //         </MenuItem>
  //       </MenuList>
  //     </Menu>
  // );

  return (
    <IconButton
      variant='text'
      color={isDark ? "white" : "black"}
      onClick={() => handleUpdate("theme", isDark ? "light" : "dark")}
    >
      {
        isDark ? <MdNightsStay size={25} /> : <FaSun size={25} />
      }
    </IconButton>
  )
};

export default ThemeToggleSwitch;
