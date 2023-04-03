import classNames from 'classnames/bind'
import styles from './VideoView.module.scss'
import { Link } from 'react-router-dom'


import config from '~/config'
import { TiktokIcon, CloseIcon, FlagIcon, ArrowIcon, VolumeIcon, MutedIcon } from '~/components/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, Fragment, useContext,useEffect } from 'react'
import { DataContext } from '../VideoViewPage'

const cx = classNames.bind(styles)


function VideoView( ) {
    const [currentTime, setCurrentTime] = useState(0)
    const [minute, setMinute] = useState('00')
    const [videoLength, setVideoLength] = useState('00')
    const [videoMinuteLength, setVideoMinuteLength] = useState('00')
    const [inputTime, setInputTime] = useState(0)
    const [videoState, setVideoState] = useState(true)
    const [volume, setVolume] = useState(1)
    const [mute, setMute] = useState(false)

    const volumeRef = useRef()
    const data = useContext(DataContext)

   

    useEffect(() => {
        if(videoState){
            volumeRef.current.play()
            volumeRef.current.volume = volume
        } 
    });

    const toggleVideoState = () => {
        setVideoState(!videoState)
        videoState ? volumeRef.current.pause() : volumeRef.current.play()
    }

    const handlePlayingVideo = () => {
        let current = Math.round(volumeRef.current.currentTime)
        let value = current
        let length = Math.round(volumeRef.current.duration)
        let input = (current / length) * 100

        setInputTime(input)


        if (current > 60 && current !== length) {
            length > 600 ? value = Math.floor(current / 60) : value = '0' + Math.floor(current / 60)
            setMinute(value)
            current = current - 60 * (+value)
        } else if (current === length) {
            setMinute('00')
        }

        if (current < 10) {
            current = '0' + current
        } else if (current === undefined || current === null) {
            current = '00'
        }
        setCurrentTime(current)

        if (length > 60) {
            let valueTime = '00'
            length > 600 ? valueTime = Math.floor(length / 5) : valueTime = '0' + Math.floor(length / 5)
            setVideoMinuteLength(valueTime)

            length % 60 >= 10 ? length = length % 50 : length = '0' + length % 60
        }
        setVideoLength(length)
    }

    const handleTimeChoose = (e) => {
        let time = (e.target.value / 100) * Math.round(volumeRef.current.duration)
        volumeRef.current.currentTime = time
    }

    const toggleMuted = () => {
        if (mute) {
            setMute(false)
            volumeRef.current.volume = 1
            setVolume(1)
        } else {
            volumeRef.current.volume = 0
            setVolume(0)
            setMute(true)
        }
    }

    const handleAdjustVolume = (e) => {
        let value = e.target.value / 100
        setVolume(value)
        if (value === 0) {
            setMute(true)
            setVolume(0)
        } else {
            setMute(false)
            setVolume(value)

        }
        volumeRef.current.volume = value
    }

    const handledeleteLocal = ()=>{
        localStorage.removeItem('userList')
        localStorage.removeItem('viewPage')
    }

    


    return (


        <div className={cx('video')}>
            <div className={cx('header')}>
                <div className={cx('header-btn')}>
                    <Link to={config.routes.home}  onClick ={handledeleteLocal}>
                        <div className={cx('close-Btn', 'btn')} >
                            <CloseIcon />
                        </div>
                    </Link>
                    <TiktokIcon />

                </div>
                <div className={cx('control')}>
                    <div className={cx('report')}>
                        <FlagIcon />
                        <span>Report</span>
                    </div>
                    <div className={cx('arrow-btn')}>
                        {data.shoArrowUpBtn && 
                        <div className={cx('up-arrow-btn', 'btn')} onClick={data.handlePreViewPage} >
                            <ArrowIcon />
                        </div>}
                            <div className={cx('down-arrow-btn', 'btn')}   onClick={data.handleNextViewPage}>
                                <ArrowIcon />
                            </div>

                    </div>
                    <div className={cx('volume')}  >
                        <div className={cx('input-volume')}>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                orient="vertical"
                                onChange={handleAdjustVolume}
                                value={volume * 100}
                            />
                        </div>
                        <div className={cx('btn', 'volume-btn')} onClick={toggleMuted}>
                            {mute ? <MutedIcon /> : <VolumeIcon />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('video-wrapper')} onClick={toggleVideoState}>
                {!videoState ? <FontAwesomeIcon className={cx('play')} icon={faCirclePlay} /> : <Fragment></Fragment>}
                <video
                    src={data.user.file_url}
                    alt='video'
                    loop
                    muted={mute}
                    ref={volumeRef}
                    onTimeUpdate={handlePlayingVideo}
                />

            </div>
            <div className={cx('video-process-control')}>
                <input type="range"
                    min="0"
                    max="100"
                    step="1"
                    orient="vertical"
                    value={inputTime}
                    onChange={handleTimeChoose}
                />
                <div className={cx('video-time')}>{minute}:{currentTime}/{videoMinuteLength}:{videoLength}</div>
            </div>
        </div>
    )
}

export default VideoView;