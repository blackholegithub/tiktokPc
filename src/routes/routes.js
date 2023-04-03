import config from '~/config'

//Layout
import { HeaderOnly } from '~/layouts'
import { StretchLayout } from '~/layouts'
import { NewLayout } from '~/layouts'

//Pages
import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Live from '~/pages/Live'
import Profile from '~/pages/Profile'
import Search from '~/pages/Search'
import Upload from '~/pages/Upload'
import Coin from '~/pages/Upload'
import Setting from '~/pages/Setting'
import Feedback from '~/pages/Feedback'
import VideoViewPage from '~/pages/VideoViewPage'

//Public routes (no need login)
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile, layout: StretchLayout },
    { path: config.routes.search, component: Search },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.coin, component: Coin, layout: HeaderOnly },
    { path: config.routes.setting, component: Setting },
    { path: config.routes.feedback, component: Feedback, layout: HeaderOnly },
    { path: config.routes.VideoViewPage, component: VideoViewPage, layout: NewLayout },
]

const privateRoutes = [
]

export { publicRoutes, privateRoutes }