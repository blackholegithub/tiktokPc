import classNames from 'classnames/bind'
import styles from './ContentView.module.scss'
import { MusicIcon, HeartIcon, CommentIcon, ShareIcon, RedHeartIcon } from '~/components/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import Image from '~/components/Image';
import { AIcon, Emojis } from '~/components/Icons'
import ShareAction from '~/components/ShareAction'

import CommentItem from '~/components/CommentItem'
import {  useContext, useState } from 'react'
import { DataContext } from '../VideoViewPage'

const cx = classNames.bind(styles)


function ContentView() {
    const data = useContext(DataContext)

    const [isLiked, setIsLiked] = useState(false)
    const [numberLiked, setNumberLiked] = useState(data.user.likes_count)
    const [cmtNumber, setCmtNumber] = useState(data.user.comments_count)
    const [follow, setFollow] = useState(false)
    const url = getCurrentURL()


    const handleFolow = () => {
        if(data.context.currentUser){
            setFollow(!follow)
        }else{
            data.context.handleShowModal()
        }
    }

    const handleCopyUrl = () => {
        let input = document.createElement('input') // tạo thẻ input giả
        document.body.appendChild(input) // gán thẻ đó vào bất kì đâu (sao cho không bị ảnh hướng layout nào là được)
        input.value = url // gán giá trị vào input
        input.select()  // focus vào input
        document.execCommand('copy') // dùng lệnh này để copy text từ input
        input.remove() //
    }

    function getCurrentURL() {
        return window.location.href
    }


    // handle  cmt input
    const handleCmtInput = (e) => {
        let input = e.target.value
        data.handleSetCmtInput(input)
        input.length > 0 ? data.handleActive(true) : data.handleActive(false)

    }


    const handleActionNumber = () => {
        if(data.context.currentUser){
            let value = !isLiked
            setIsLiked(value)
            value ? setNumberLiked(pre => pre + 1) : setNumberLiked(pre => pre - 1)
        }else{
            data.context.handleShowModal()
        }  

    }

    const handleCmtPost = ()=>{
        if(data.context.currentUser && data.cmtInput.length > 0 ){
            alert('Feature is in testing')
        }else{
            data.context.handleShowModal()
        }
    }




    return (
        <div className={cx('content')}>
            <div className={cx('content-inf')}>
                <div className={cx('inf-header')}>
                    <div className={cx('user-img')}>
                        <Image
                            className={cx('avatar')}
                            src={'img'}
                            alt={'img'}
                            noImageUser
                        />
                    </div>
                    <div className={cx('user-inf')}>
                        <div className={cx('user-nickname')}>{data.user.user.nickname}
                            <span className={cx('tippy-username')}>
                                {data.user.user.tick && (
                                    <FontAwesomeIcon
                                        className={cx('verified')}
                                        icon={faCheckCircle}
                                    />
                                )}
                            </span>
                        </div>
                        <div className={cx('user-fullname')}>{data.user.user.first_name +' '+ data.user.user.last_name}</div>

                    </div>
                    <Button outline primary onClick={handleFolow}>{follow ? 'Following' : 'Follow'}</Button>
                </div>
                <div className={cx('inf-container')}>
                    <div className={cx('inf-description')}>{data.user.description}</div>
                    <div className={cx('inf-music')}>
                        <MusicIcon />
                        <div className={cx('music-name')}>{data.user.music}</div>
                    </div>
                </div>
                <div className={cx('inf-footer')}>
                    <div className={cx('inf-action')}>
                        <div className={cx('action')}>
                            <div className={cx('action-number')} onClick={handleActionNumber}>
                                {isLiked ?
                                    <RedHeartIcon width='2rem' height='2rem' />
                                    :
                                    <HeartIcon width='2rem' height='2rem' />
                                }
                            </div>
                            <span>{numberLiked}</span>
                            <div className={cx('action-number')}>
                                <CommentIcon width='2rem' height='2rem' />
                            </div>
                            <span>{cmtNumber}</span>
                        </div>
                        <div className={cx('video-cmt-share')}>
                            <ShareAction offset={[-100, 10]}>
                                <div> <ShareIcon /></div>
                            </ShareAction>
                        </div>
                    </div>
                    <div className={cx('inf-video-link')}>
                        <div className={cx('link')}>{url}</div>
                        <span className={cx('video-link-copy')} onClick={handleCopyUrl}>Sao chép liên kết</span>
                    </div>
                </div>
            </div>
            <div className={cx('comments-views')}>
                        <CommentItem    />
                        <CommentItem    />
                        <CommentItem    />
                        <CommentItem    />
                        <CommentItem    />
                        <CommentItem    />
                        <CommentItem    />
                        <CommentItem    />
                        <CommentItem    />
            </div>
            <div className={cx('comment-button')}>
                <div className={cx('comment-button-container')}>
                    <div className={cx('comment-input-area')}>
                        <input type='text' placeholder='Add comment...' value={data.cmtInput} onChange={handleCmtInput} required pattern="\S+.*" />
                        < div className={cx('comments-icon')}>
                            <div className={cx('comments-a-icon', 'comments-icon-wrapper')} onClick={data.handleAddA}>
                                <AIcon />
                            </div >
                            <div className={cx('comments-emojis-icon', 'comments-icon-wrapper')} onClick={data.handleShowEmojis} >
                                <Emojis className={cx('emojis-icon')} />
                            </div>

                        </div>
                    </div>
                    <div className={cx('comment-button-post', { active: data.active })} onClick={handleCmtPost}>Post</div>
                </div>
            </div>

        </div>




    )
}

export default ContentView