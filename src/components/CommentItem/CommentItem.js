import styles from './CommentItem.module.scss'
import classNames from 'classnames/bind'
import Image from '~/components/Image'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useState,useContext } from 'react'
import { RedHeartIcon } from '../Icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { DataContext } from '~/pages/VideoViewPage'



const cx = classNames.bind(styles)

function CommentItem() {

    
    const [isLiked, setIsLiked] = useState(false)
    const [numberLiked, setNumberLiked] = useState(0)
    const tick = true

    const data = useContext(DataContext)

    const handleLiked =()=>{
        if(data.context.currentUser){
            let check = !isLiked
            setIsLiked(!isLiked)
            check ? setNumberLiked(pre=>pre + 1): setNumberLiked(pre=>pre - 1)
        }else{
            data.context.handleShowModal()
        }  
    }

    return (
        <div className={cx('Container')}>
            <div className={cx('Content')}>
                <Link to={`/@/${''}`} className={cx('user')}>
                    <Image
                        className={cx('avatar')}
                        src=''
                        alt='user'
                        noImageUser
                    />
                </Link>
                <div className={cx('body')}>
                    <Link>
                        <div className={cx('user-name')}>
                            Admin
                            <span className={cx('tippy-username')}>
                                        {tick && (
                                            <FontAwesomeIcon
                                                className={cx('verified')}
                                                icon={faCheckCircle}
                                            />
                                        )}
                            </span>
                        </div>
                    </Link>
                    <div className={cx('comment-content')}>missing api code,fixing...</div>
                    <p>
                        <span>4 ngày trước</span>
                        <span>Trả lời</span>
                    </p>
                    <div className={cx('reply')}>
                        <div className={cx('title')}>Xem thêm câu trả lời khác (...)</div>
                        <ArrowIcon className={cx('arrow')} width='1.4rem' height='1.4rem' />
                    </div>
                </div>
                <div className={cx('action')}>
                    <div className={cx('heart-icon')} onClick={handleLiked}>
                       {!isLiked ? <FontAwesomeIcon icon={faHeart} width='1.8rem' height='1.8rem' viewBox='0 0 510 516'/> : <RedHeartIcon width='2rem' height='1.9rem'/>} 
                    </div>
                    <p>{numberLiked}</p>
                </div>
            </div>


        </div>
    )
}

export default CommentItem