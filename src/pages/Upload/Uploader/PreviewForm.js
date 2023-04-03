import styles from './Uploader.module.scss';
import classNames from 'classnames/bind';
import { VideoUpload } from '../Upload';
import { useContext } from 'react';
import images from '~/assets/images';

const cx = classNames.bind(styles);


function PreviewFrom() {
    const videoState = useContext(VideoUpload)

    const handleChangeVideo = ()=>{
        videoState.handleSetIsVideo(null)
    }
    

    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('video-container')}>
                <div className={cx('video-player')}>
                    <div className={cx('video-player-container')}>
                        <div className={cx('video-player-content')}>
                            <video src={videoState.isVideo} alt={videoState.fileName} controls loop muted autoPlay />
                        </div>
                        <div className={cx('video-player-layout-home')} style={{ backgroundImage: `url(${images.backgroundMobile})` }}></div>
                        <div className={cx('video-control')}> </div>
                    </div>

                </div>
            </div>
            <div className={cx('video-content')}>
                <div className={cx('video-file')}>
                    <img src='https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/check_icon.8e166106.svg' alt='' />
                    <div className={cx('video-name')}>{videoState.fileName}</div>
                </div>
                <div className={cx('video-clear')} onClick={handleChangeVideo}>Change video</div>
            </div>
        </div>
    )
}

export default PreviewFrom;