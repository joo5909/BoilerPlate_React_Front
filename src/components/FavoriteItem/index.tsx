import React from 'react'
import { FavoriteListItem } from 'types/interface'
import defaultProfileImage from 'assets/images/default-profile-image.png';
import './style.css'

interface Props {
  favoriteListItem: FavoriteListItem
}

function FavoriteItem({favoriteListItem} : Props) {

  const {nickName, profileImage} = favoriteListItem;

  return (
    <div className = "favorite-list-item">
        <div className = "favorite-list-item-profile-box">
            <div className = "favorite-list-item-profile-image" style = {{ backgroundImage : `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
        </div>
        <div className = "favorite-list-item-nickname">{nickName}</div>
    </div>
  )
}

export default FavoriteItem