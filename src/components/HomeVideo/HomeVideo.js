import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import config from '~/config';
import React from 'react';

import styles from './HomeVideo.module.scss';
import {
    CommentIcon,
    FlagIcon,
    HeartIcon,
    MusicIcon,
    MutedIcon,
    PauseIcon,
    PlaySolidIcon,
    RedHeartIcon,
    ShareSolidIcon,
    VolumeIcon,
} from '~/components/Icons';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Popper from '~/components/Popper';
import { ModalContext } from '~/components/ModalProvider';
import ShareAction from '~/components/ShareAction';

const cx = classNames.bind(styles);

function Video({ data, mute, volume, adjustVolume, toggleMuted }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [heart, setHeart] = useState(false);
    const [tymNumber, setTymNumber] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const videoRef = useRef();
    const context = useContext(ModalContext);



    const VideoViewPageStateValue = {
        data: data,
        videoList : context.videos,
    }

    useEffect(() => {
        mute ? (videoRef.current.volume = 0) : (videoRef.current.volume = volume);
    })
    const playVideo = () => {
        if (isPlaying === false) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    }

    const pauseVideo = () => {
        if (isPlaying === true) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const togglePlayVideo = () => {
        if (isPlaying === false) {
            playVideo();
        } else {
            pauseVideo();
        }
    };
    const handleClickHeart = () => {
        if (context.currentUser) {
            setHeart(!heart);
            setTymNumber(!tymNumber);
        }
        context.handleShowModal();
    }
    const handleFollow = () => {
        if (context.currentUser) {  
            setIsFollowing(!isFollowing);
        }
        context.handleShowModal();
    }

    function playVideoInViewport() {
        let bounding = videoRef.current.getBoundingClientRect();
        if (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
            playVideo();
        } else {
            pauseVideo();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', playVideoInViewport);
        return () => window.removeEventListener('scroll', playVideoInViewport);
    },)


    return (
        <div className={cx('wrapper')}>
            <Link to={`/@/${data?.user.nickname}`} state={data?.user}>
                <Image className={cx('avatar')} src={data?.user.avatar} alt={data?.user.avatar} noImageUser />
            </Link>

            <div className={cx('content')}>
                <div className={cx('info-wrapper')}>
                    <div className={cx('text-info')}>
                        <Link to={`/@/${data?.user.nickname}`} state={data?.user}>
                            <div className={cx('author')}>
                                <div>
                                    <HeadlessTippy
                                        interactive
                                        hideOnClick="false"
                                        placement="bottom"
                                        delay={[1000, 0]}
                                        offset={[40, 30]}
                                        zIndex="99"
                                        render={(attrs) => (
                                            <div tabIndex="-1" {...attrs}>
                                                <Popper className={cx('account-tab')}>
                                                    <div className={cx('header')}>
                                                        <Image
                                                            className={cx('tippy-avatar')}
                                                            src={data?.user.avatar}
                                                            alt={data?.user.avatar}
                                                            noImageUser
                                                        />

                                                        {isFollowing ? (
                                                            <Button outline primary onClick={handleFollow}>
                                                                Following
                                                            </Button>
                                                        ) : (
                                                            <Button outline primary onClick={handleFollow}>
                                                                Follow
                                                            </Button>
                                                        )}
                                                    </div>

                                                    <div className={cx('tippy-username')}>
                                                        <span>{data?.user.nickname}</span>
                                                        {data?.user.tick && (
                                                            <FontAwesomeIcon
                                                                className={cx('verified')}
                                                                icon={faCheckCircle}
                                                            />
                                                        )}
                                                    </div>

                                                    <div className={cx('tippy-name')}>
                                                        {data?.user.full_name ||
                                                            `${data?.user.first_name} ${data?.user.last_name}`}
                                                    </div>

                                                    <div className={cx('user-stats')}>
                                                        <div className={cx('follower-stats')}>
                                                            <span className={cx('bold')}>
                                                                {data?.user.followers_count}
                                                            </span>{' '}
                                                            Followers
                                                        </div>

                                                        <div className={cx('like-stats')}>
                                                            <span className={cx('bold')}>{data?.user.likes_count}</span>{' '}
                                                            Likes
                                                        </div>
                                                    </div>

                                                    <div className={cx('user-bio')}>{data?.user.bio}</div>
                                                </Popper>
                                            </div>
                                        )}
                                    >
                                        <p className={cx('username')}>{data?.user.nickname}</p>
                                    </HeadlessTippy>
                                </div>
                                <p className={cx('fullname')}>{`${data?.user.first_name} ${data?.user.last_name}`}</p>
                            </div>
                        </Link>

                        <div>
                            <div className={cx('caption')}>{data?.description}</div>
                            <div className={cx('music')}>
                                <MusicIcon className={cx('icon')} />
                                {data?.music}
                            </div>
                        </div>
                    </div>

                    {isFollowing ? (
                        <Button outline style={{ height: '28px' }} onClick={handleFollow}>
                            Following
                        </Button>
                    ) : (
                        <Button outline style={{ height: '28px' }} onClick={handleFollow}>
                            Follow
                        </Button>
                    )}
                </div>

                <div className={cx('video-wrapper')}>
                    <div className={cx('video-card')}>
                        {data.file_url === null && <div className={cx('loader')}></div>}
                        <Link to={config.routes.VideoViewPage} state={VideoViewPageStateValue} > 
                            <video
                                style={
                                    data?.meta.video.resolution_x < data?.meta.video.resolution_y
                                        ? { width: '273px' }
                                        : { width: '463px' }
                                }
                                loop
                                src={data?.file_url}
                                ref={videoRef}
                            />
                        </Link>

                        <div className={cx('control-play')} onClick={togglePlayVideo}>
                            {isPlaying ? <PauseIcon /> : <PlaySolidIcon />}
                        </div>

                        <div className={cx('control-volume', { active: mute })}>
                            <div className={cx('container')}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    orient="vertical"
                                    onChange={adjustVolume}
                                    value={volume * 100}
                                />
                            </div>

                            <div className={cx('volume-icon')} onClick={toggleMuted}>
                                {mute ? <MutedIcon /> : <VolumeIcon />}
                            </div>
                        </div>

                        <div className={cx('report')}>
                            <FlagIcon /> Report
                        </div>
                    </div>

                    <div className={cx('actions')}>
                        <div className={cx('action-btn')}>
                            {heart ? (
                                <Button rounded onClick={handleClickHeart}>
                                    <RedHeartIcon />
                                </Button>
                            ) : (
                                <Button rounded onClick={handleClickHeart}>
                                    <HeartIcon />
                                </Button>
                            )}
                            <p className={cx('numbers')}>{data?.likes_count + tymNumber}</p>
                        </div>
                        <div className={cx('action-btn')}>
                            <Button rounded onClick={context.handleShowModal}>
                                <CommentIcon />
                            </Button>
                            <p className={cx('numbers')}>{data?.comments_count}</p>
                        </div>
                        <ShareAction offset={[90, 0]}>
                            <div className={cx('action-btn')}>
                                <Button rounded>
                                    <ShareSolidIcon />
                                </Button>
                                <p className={cx('numbers')}>{data?.shares_count}</p>
                            </div>
                        </ShareAction>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Video);
