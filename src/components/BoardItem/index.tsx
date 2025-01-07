import React from 'react'
import './style.css'
import { BoardListItem } from 'types/interface'
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from 'assets/images/default-profile-image.png';

interface Props {
    boardListItem: BoardListItem
}

export default function BoardItem({ boardListItem }: Props) {

    const { boardIdx, title, content, boardTitleImage, favoriteCount, commentCount, viewCount, regdate, writerNickName, writerProfileImage } = boardListItem;

    const navigate = useNavigate();

    const onClickBoardListItem = () => {
        navigate(boardIdx);
    }    

    return (
        <div className='board-list-item' onClick={onClickBoardListItem}>
            <div className='board-list-item-main-box'>
                <div className='board-list-item-top'>
                    <div className='board-list-item-profile-box'>
                        <div className='board-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage || defaultProfileImage})` }}></div>
                    </div>
                    <div className='board-list-item-write-box'>
                        <div className='board-list-item-nickname'>{writerNickName}</div>
                        <div className='board-list-item-write-date'>{regdate}</div>
                    </div>
               
                </div>
                <div className='board-list-item-middle'>
                    <div className='board-list-item-title'>{title}</div>
                    <div className='board-list-item-content'>{content}</div>
                </div>
                <div className='board-list-item-bottom'>
                    <div className='board-list-item-counts'>
                        {`조회수 ${viewCount} 좋아요 ${favoriteCount} 댓글 ${commentCount}`}
                    </div>
                </div>
            </div>
            {boardTitleImage && (
                <div className='board-list-item-image-box'>
                    <div className='board-list-item-image' style={{ backgroundImage: `url(${boardTitleImage})` }}></div>
                </div>
            )}   
        </div>
    )
}
