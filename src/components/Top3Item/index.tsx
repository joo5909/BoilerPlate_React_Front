import React from 'react'
import './style.css'
import { BoardListItem } from 'types/interface'
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from 'assets/images/default-profile-image.png';

interface Props {
    top3ListItem: BoardListItem
}

export default function Top3Item({top3ListItem} : Props) {

    const {boardIdx, title, content, boardTitleImage, favoriteCount, commentCount, viewCount, regdate, writerNickName, writerProfileImage } = top3ListItem;

    const navigate = useNavigate();


    const onClickBoardListItem = () => {
        navigate(boardIdx);
    }    

  return (

        <div className = 'top3-list-item' style = {{ backgroundImage : `url(${boardTitleImage})`}} onClick={onClickBoardListItem}>
            <div className = 'top3-list-item-main-box'>
                <div className = 'top-3-list-item-top'>
                    <div className = 'top-3-list-item-profile-box'>
                        <div className = 'top-3-list-item-profile-image' style = {{ backgroundImage : `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>
                    </div>
                    <div className = 'top-3-list-item-write-box'>
                        <div className = 'top-3-list-item-nickname'>{writerNickName}</div>
                        <div className = 'top-3-list-item-write-date'>{regdate}</div>
                    </div>
                </div>
                <div className = 'top-3-list-item-middle'>
                    <div className = 'top-3-list-item-title'>{title}</div>
                    <div className = 'top-3-list-item-content'>{content}</div>
                </div>
                <div className = 'top-3-list-item-bottom'>
                    <div className = 'top-3-list-item-counts'>
                        {`조회수 ${viewCount} 좋아요 ${favoriteCount} 댓글 ${commentCount}`}
                    </div>
                </div>
            </div>
        </div>
 
  )
}
