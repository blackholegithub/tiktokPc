import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { Link } from 'react-router-dom'
import React from 'react'
import { useContext,useState} from 'react'

import config from '~/config'
import styles from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button'
import Menu from '~/components/Menu'
import { InboxIcon, MessageIcon, LanguageIcon, QuestionMarkIcon, KeyboardIcon, UserIcon, TikTokCoinIcon, GearIcon, LogOutIcon, PlusIcon, EllipsisVerticalIcon } from '~/components/Icons'
import Image from '~/components/Image'
import SearchInput from '~/components/SearchInput'
import { ModalContext } from '~/components/ModalProvider'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        subMenu: {
            title: 'Languages',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                }
            ]
        }
    },
    {
        icon: <QuestionMarkIcon />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts'
    }
]


const userMenu = [
    {
        icon: <UserIcon />,
        title: 'Profile',
        to: config.routes.profile
    },
    {
        icon: <TikTokCoinIcon />,
        title: 'Get coins',
        to: config.routes.coin
    },
    {
        icon: <GearIcon />,
        title: 'Settings',
        to: config.routes.setting
    },
    ...MENU_ITEMS,
    {
        icon: <LogOutIcon />,
        title: 'Log out',
        separate: true
    },
]

function Header({ stretch }) {
    const context = useContext(ModalContext)
    const [menu,setMenu]= useState(MENU_ITEMS)

        const handleSetMenu =()=>{
            if(context.currentUser){
                setMenu(userMenu)
            }else{
                setMenu(MENU_ITEMS) 
            }
            console.log(123)
        }
    context.handleSetMenu = handleSetMenu
    const handleMenuChange = (item) => {
        console.log(item)
        if(item.title === 'Log out'){
            context.handleUser()
            handleSetMenu()
        }
        }
       
       

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', { stretch: stretch })}>
                <Link to={config.routes.home} className={cx('logo')}><img src={images.logo} alt="TikTok" /></Link>

                <div><SearchInput /></div>

                <div className={cx('actions')}>

                    {context.currentUser ?
                        <Button to={config.routes.upload}><PlusIcon className={cx('upload-icon')} /> Upload</Button>
                        :
                        <Button onClick={context.handleShowModal}><PlusIcon className={cx('upload-icon')} /> Upload</Button>
                    }

                    {context.currentUser ? (
                        <>
                            <Tippy content="Messages" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>

                            <Tippy content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary onClick={context.handleShowModal}>Log in</Button>
                        </>
                    )}
                    <Menu items={menu} onChange={handleMenuChange}>
                        {context.currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src=""
                                alt="yoonsulll"
                                noImageUser
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <EllipsisVerticalIcon className={cx('more-icon')} />
                            </button>
                        )}
                    </Menu>

                </div>
            </div>
        </header>
    )
}

export default React.memo(Header)
