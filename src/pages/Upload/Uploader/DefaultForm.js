import styles from './Uploader.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useRef,useContext } from 'react';
import { VideoUpload } from '../Upload';


const cx = classNames.bind(styles);


function DefaultForm() {

    const videoState = useContext(VideoUpload)
    const fileRef = useRef()

    const uploadProcess = (files) => {
        if (files[0] && files[0].size <=268435456) {
            videoState.handleSetIsVideo(URL.createObjectURL(files[0]));
            videoState.handleSetFileName(files[0].name)
        }else{
            alert('your file is too big, please choose another file')
        }
        
    }

    const handleUploadFile = () => {
        fileRef.current.click();
    }

    return (<div className={cx('uploader')}>
        <div className={cx('upload')}>
            <input
                type="file"
                accept="video/*"
                hidden
                ref={fileRef}
                onChange={(e) => uploadProcess(e.target.files)}
                name="file"
            />
            <div className={cx('upload-card')} onClick={handleUploadFile}>
                <img
                    src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                    className={cx('cloud-icon')}
                    alt=""
                />

                <div className={cx('text-main')}>
                    <span>Select video to upload</span>
                </div>
                <div className={cx('text-sub')}>
                    <span>Or drag and drop a file</span>
                </div>
                <div className={cx('text-video-info')}>
                    <span>MP4 or WebM</span>
                    <span>720x1280 resolution or higher</span>
                    <span>Up to 10 minutes</span>
                    <span>Less than 2 GB</span>
                </div>

                <Button primary>Select file</Button>
            </div>
        </div>
    </div>);
}

export default DefaultForm;