import * as httpRequest from '~/utils/httpRequest'

//  https://tiktok.fullstack.edu.vn/api/users/search?q=ninhnam&type=less
// https://tiktok.fullstack.edu.vn/api/users/suggested?q=ninhnam&page=1&per_page=5
// https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=1
// API user and video 

export const search = async (q, type = "less", page = null) => {
    try {
        const response = await httpRequest.get('users/search', {
            params: {
                q,
                type,
                page
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}
