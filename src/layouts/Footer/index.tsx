import React from 'react'
import './style.css'

function Footer() {

    const onInstaIconButtonClickHandler = () => {
        window.open('https://www.instagram.com/','_blank')
    }

    const onNaverBlogIconButtonClickHandler = () => {
        window.open('https://blog.naver.com/','_blank')
    }
  return (
    <div className = 'footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className = 'icon-box'>
                        <div className = 'icon logo-light-icon'></div>
                    </div>
                    <div className='footer-logo-text'></div>
                </div>
                <div className='footer-link-box'>
                    <div className='footer-email-link'></div>
                    <div className='icon-button' onClick={onInstaIconButtonClickHandler}>
                        <div className = 'icon insta-icon'></div>
                    </div>
                    <div className='icon-button' onClick={onNaverBlogIconButtonClickHandler}>
                        <div className = 'icon naver-blog-icon'></div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'></div>
            </div>
        </div>
    </div>
  )
}

export default Footer