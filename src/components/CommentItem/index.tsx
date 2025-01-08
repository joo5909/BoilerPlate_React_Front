import React from 'react'
import './style.css'
import { CommentListItem } from 'types/interface'
import defaultProfileImage from 'assets/images/default-profile-image.png';

interface Props {
    commnetListItem: CommentListItem
}

export default function CommentItem({commnetListItem} : Props) {

    const {nickname, profileImage, regdate, content} = commnetListItem;

    return (
        <div className='commnet-list-item'>
            <div className='commnet-list-item-top'>
                <div className = 'commnet-list-item-profile-box'>
                    <div className = 'commnet-list-item-profile-image' style = {{ backgroundImage : `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
                </div>
                <div className = 'commnet-list-item-nickname'>{nickname}</div>
                <div className = 'commnet-list-item-divider'>{'\|'}</div>
                <div className = 'commnet-list-item-time'>{regdate}</div>
            </div>
            <div className='commnet-list-item-main'>
                <div className='commnet-list-item-content'>{content}</div>
            </div>
        </div>
    )
}
