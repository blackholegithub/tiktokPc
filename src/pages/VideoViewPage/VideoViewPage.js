import classNames from 'classnames/bind'
import styles from './VideoViewPage.module.scss'
import { createContext, Fragment, useContext, useEffect, useState } from 'react'

import EmojiPicker from 'emoji-picker-react';
import SkinTones from 'emoji-picker-react';

import { useLocation } from 'react-router-dom'
import VideoView from './VideoView/VideoView'
import ContentView from './ContentView';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles)
export const DataContext = createContext()


function VideoViewPage() {
    const context = useContext(ModalContext)
    const location = useLocation()
    const CurrentPage = JSON.parse(localStorage.getItem('viewPage'))
    const videoUserList = JSON.parse(localStorage.getItem('userList'))

    const userLocation = location.state?.data
    const [userList, setUserList] = useState(!videoUserList ? [location.state?.data, ...location.state?.videoList] : [location.state?.data, ...videoUserList])
    const [emojisShow, setEmojisShow] = useState(false)
    const [active, setActive] = useState(false)
    const [cmtInput, setCmtInput] = useState('')
    const [viewPage, setVideoViewPage] = useState(CurrentPage ? CurrentPage + 1 : 0)
    const [user, setUser] = useState(userLocation)

    const [shoArrowUpBtn, setShowArrowUpBtn] = useState(false)


    useEffect(() => {
        const handleRenderUser = () => {
            if (viewPage === userList.length - 5) {
                context.setNewPageHome()

            } else if (viewPage === userList.length - 1) {
                setUserList(pre => [...pre, ...context.videoView])
            }
        }
        handleRenderUser()
    }, [viewPage])


    useEffect(() => {
        const handleRepeatUserList = () => {
            let cachedObject = {};
            userList.map((item) => (cachedObject[item.id] = item));
            const list = Object.values(cachedObject);
            setUserList(list.reverse())
        }
        handleRepeatUserList()

    }, [])

    useEffect(() => {
        localStorage.setItem('userList', JSON.stringify(userList))
    }, [viewPage])

    useEffect(() => {
        localStorage.setItem('viewPage', JSON.stringify(viewPage))
    }, [viewPage])


    useEffect(() => {
        const storedCurrentPage = JSON.parse(localStorage.getItem('viewPage'))
        if (storedCurrentPage) {
            setVideoViewPage(storedCurrentPage)
            setVideoPageCurr(storedCurrentPage)
        }
    }, []);

    useEffect(() => {
        return () => {
            localStorage.removeItem('userList')
            localStorage.removeItem('viewPage')
        }
    }, [])




    const setVideoPageCurr = (page) => {
        if (page === 0) {
            setShowArrowUpBtn(false)
        } else {
            setShowArrowUpBtn(true)
        }
        setUser(userList[page]) 
    }

    const handleNextViewPage = () => {

        let page = viewPage + 1
        setVideoViewPage(page)
        setVideoPageCurr(page)
        
    }

    // useEffect(()=>{
    //     const newUrl = `/view/${user.user.nickname}`;
    //     window.history.replaceState({}, '', newUrl)
    //     return window.history.replaceState({}, '','/view/:nickname')

    // },[viewPage])
    

    const handlePreViewPage = () => {
        let page = viewPage - 1
        if (page < 0) {
            page = 0
        }
        setVideoViewPage(page)
        setVideoPageCurr(page)


    }





    const handleHideEmojis = () => {
        if (emojisShow) {
            setEmojisShow(false)
        } else {
            return
        }
    }

    const handleShowEmojis = () => {
        setEmojisShow(!emojisShow)
    }

    const handleSetCmtInput = (data) => {
        setCmtInput(data)
    }
    const handleActive = (boolean) => {
        setActive(boolean)
    }

    const handleAddA = () => {
        setCmtInput(pre => pre + '@')
        setActive(true)
    }



    const handleEmojisChoose = (e) => {
        setCmtInput(pre => pre + e.emoji)
        setActive(true)
    }

    const datas = {
        user,
        emojisShow,
        active,
        cmtInput,
        context,
        shoArrowUpBtn,
        handleShowEmojis,
        handleAddA,
        handleActive,
        handleSetCmtInput,
        handleNextViewPage,
        handlePreViewPage,
    }


    return (
        <Fragment>
            <div className={cx('container')} onClick={handleHideEmojis}>
                <DataContext.Provider value={datas}>
                    <VideoView
                        
                    />
                    <ContentView
                    />
                </DataContext.Provider>
            </div>
            {emojisShow ?
                (<div className={cx('emopjis-table')} >
                    <EmojiPicker width='350px' height='450px'
                        defaultSkinTon={<SkinTones />}
                        lazyLoadEmojis
                        onEmojiClick={handleEmojisChoose}
                    />
                </div>)
                :
                <Fragment></Fragment>}

        </Fragment>
    )
}

export default VideoViewPage