import React, { useState } from 'react'
import { Header } from '../components/Layout/Header'
import styles from '../styles/styles'
import ProfileSidebar from '../components/Profile/ProfileSidebar.jsx'
import {ProfileContent} from '../components/Profile/ProfileContent.jsx'

export const ProfilePage = () => {
    const [active ,setActive] =useState(1);
  return (



  <div className={`${styles.section} flex h-[calc(100vh-80px)] bg-[#f5f5f5]`}>

  {/* SIDEBAR */}
  <div >
    <ProfileSidebar active={active} setActive={setActive} />
  </div>

  {/* CONTENT (IMPORTANT FIX HERE) */}
  <div className="flex-1 h-full min-h-0 overflow-y-auto">
    <ProfileContent active={active} />
  </div>

</div>



  )



}

