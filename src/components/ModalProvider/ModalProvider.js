import { useState, createContext ,useEffect} from 'react'
import { responseVideoError } from '~/services/DataErrorCallApi'
import * as videoService from '~/services/videoService'


const ModalContext = createContext()

function ModalProvider({ children }) {
   
    const [active, setActive] = useState(false)
    const [currentUser, setCurrentUser] = useState(false)
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(Math.floor(Math.random() * 10) )
    const [videoView,setVideoView] = useState([])
    



    useEffect(() => {
        const fetchAPI = async () => {
            const result = await videoService.loadVideo('for-you', page)
            if (!result) {
                setVideos(prev => [...prev, ...responseVideoError])
                
            } else {
                setVideos(prev => [...prev, ...result])
                setVideoView(result)
            }

        }
        fetchAPI()

    }, [page])
    const setNewPageHome = () => {
        setPage(page => {
            let value = Math.floor(Math.random() * 10) 
            if (page === value) {
                page = value + 1
                return page 
            } else {
                page = value
                return page
            }
        })
    }

    useEffect(()=>{
        const username = localStorage.getItem('currentUser')
        setCurrentUser(username===null ? false : true)
    },[])
    

    const handleShowModal = () => {
        if (currentUser === false) {
            setActive(true)
        }
    }

    // const handleSetVideos = (datas)=>{
    //     setVideos(pre=>[...pre,...datas])
    // }

    const handleHideModal = () => {
        setActive(false)
    }

    const handleUser = () => {
        setCurrentUser(!currentUser)

    }

   
    

    const value = {
        active,
        currentUser,
        videos,
        page,
        videoView,
        handleShowModal,
        handleHideModal,
        handleUser,
        setNewPageHome,

    }

    useEffect(() => {
        if(currentUser){
            localStorage.setItem('currentUser', currentUser)
        }else{
            localStorage.removeItem('currentUser');
        }
      }, [currentUser]);
        // 
      

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider }