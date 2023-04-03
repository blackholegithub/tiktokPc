import classNames from 'classnames/bind';
import { createContext, useRef, useState } from 'react';
import Button from '~/components/Button';
import UploaderForm from './Uploader/UploaderForm';

import styles from './Upload.module.scss';

export const VideoUpload = createContext()
const cx = classNames.bind(styles);

function Upload() {
    const [rowsCaption, setRowsCaption] = useState(1)
    const [value, setValue] = useState('')
    const [isVideo, setIsVideo] = useState(null)
    const [fileName,setFileName] = useState(null)

    const inputCaptionRef = useRef();
    

    const handleCaptionValue = (e) => {
        let currValue = e.target.value;
        if (currValue.length >= 50) {
            setRowsCaption(2);
        } else if (currValue.length >= 100) {
            setRowsCaption(3);
        }
        setValue(currValue)
    }

    const handleSetIsVideo =(data)=>{
        setIsVideo(data)
    }

    const handleSetFileName =(data)=>{
        setFileName(data)
    }

    const videoState ={
        isVideo,
        handleSetIsVideo,
        fileName,
        handleSetFileName
    }


    const handleAddSign = () => {
        setValue(value + '#');
        inputCaptionRef.current.focus();
    }

    const clickEdit = () => (isVideo ? console.log('doing some thing') : alert('Please Upload a video first'));

    const hanldePostVideo =()=>{
        alert('This feature is in the process of being fixed, please come back later')
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Upload video</span>
            <span className={cx('subtitle')}>Post a video to your account</span>

            <div className={cx('content')}>
                <VideoUpload.Provider value={videoState} >
                    <UploaderForm />
                </VideoUpload.Provider>
                <div className={cx('form')}>
                    <div className={cx('form-edit')}>
                        <img
                            src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/divide_black.e1e40d5b.svg"
                            className={cx('form-edit-icon')}
                            alt=""
                        />
                        <div className={cx('form-edit-content')}>
                            <div className={cx('form-edit-title')}>Divide videos and edit</div>
                            <p>
                                You can quickly divide videos into multiple parts, remove redundant parts and turn
                                landscape videos into portrait videos
                            </p>
                        </div>
                        <Button primary onClick={clickEdit}>
                            Edit
                        </Button>
                    </div>
                    <div className={cx('form-caption')}>
                        <div className={cx('form-caption-header')}>
                            <div className={cx('form-caption-title')}>Caption</div>
                            <div className={cx('form-caption-text-number')}> {value.length} / 150</div>
                        </div>
                        <div className={cx('form-caption-content')}>
                            <textarea
                                ref={inputCaptionRef}
                                id="text"
                                name="text"
                                rows={rowsCaption}
                                cols="50"
                                maxLength="150"
                                value={value}
                                onChange={handleCaptionValue}
                            ></textarea>
                            <div className={cx('form-caption-icons')}>
                                <img
                                    src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/at.062a03e9.svg"
                                    className={cx('info-icon')}
                                    alt=""
                                />
                                <img
                                    src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/hashtag.234f1b9c.svg"
                                    className={cx('sign-icon')}
                                    alt=""
                                    onClick={handleAddSign}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('form-cover')}>
                        <div className={cx('form-cover-title')}>Cover</div>
                        <div className={cx('form-cover-container')}></div>
                    </div>
                    <div className={cx('form-private')}>
                        <label>Who can watch this video</label>

                        <select>
                            <option value="public">Public</option>
                            <option value="friends">Friends</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <div className={cx('form-allow-users')}>
                        <div className={cx('form-allow-title')}> Allow users to:</div>
                        <div className={cx('choose')}>
                            <input type="checkbox" value="Comment" />
                            <label>Comment</label>
                            <input type="checkbox" value="Duet" />
                            <label>Duet</label>
                            <input type="checkbox" value="Stitch" />
                            <label>Stitch</label>
                        </div>
                    </div>
                    <div className={cx('form-schedule')}>
                        <div className={cx('form-schedule-title')}>Schedule video</div>
                        <div className={cx('form-schedule-toggle')}>
                            <label className={cx('switch')}>
                                <input type="checkbox" />
                                <span className={cx('slider')}></span>
                            </label>
                        </div>
                    </div>
                    <div className={cx('form-copyright')}>
                        <div className={cx('form-copyright-title')}>Run a copyright check</div>
                        <div className={cx('form-copyright-toggle')}>
                            <label className={cx('switch')}>
                                <input type="checkbox" />
                                <span className={cx('slider')}></span>
                            </label>
                        </div>
                    </div>
                    <p>
                        We'll check your video for potential copyright infringements on used sounds. If infringements
                        are found, you can edit the video before posting.
                    </p>
                    <div className={cx('form-button')}>
                        <Button outline className={cx('button-action')}>
                            Discard
                        </Button>
                        <Button primary className={cx('button-action')} disabled={!isVideo} onClick={hanldePostVideo}>
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
