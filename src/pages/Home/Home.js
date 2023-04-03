import { useState, useEffect, useContext, useCallback } from 'react'
import classNames from 'classnames/bind'
import React from 'react'


import Video from '~/components/HomeVideo'
import styles from './Home.module.scss'

import { ModalContext } from '~/components/ModalProvider'

const cx = classNames.bind(styles)

function Home() {
    const context = useContext(ModalContext);
    const [volume, setVolume] = useState(0.8)
    const [prevVolume, setPrevVolume] = useState(volume)
    const [mute, setMute] = useState(false)

    const handleScroll = useCallback(() => {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            context.setNewPageHome()
        }
      }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll])

    const handleAdjustVolume = (e) => {
        setVolume(e.target.value / 100)
    }

    const toggleMuted = () => {
        if (mute) {
            setVolume(prevVolume)
            setMute(false)
        } else {
            setPrevVolume(volume)
            setVolume(0)
            setMute(true)
        }
    }

    return (
        <div className={cx('wrapper')}>
            {context.videos.map((video, index) => (
                <Video key={index++}  data={video} volume={volume} mute={mute} adjustVolume={handleAdjustVolume} toggleMuted={toggleMuted}></Video>        
            ))}
        </div>
    )
}

export default React.memo(Home)