const responseVideo = [{
    "id": null,
    "uuid": "",
    "user_id": null,
    "type": "",
    "thumb_url": "",
    "file_url": null,
    "description": "",
    "music": "",
    "is_liked": false,
    "likes_count": 0,
    "comments_count": 0,
    "shares_count": 0,
    "views_count": 0,
    "viewable": "public",
    "allows": "[\"duet\",\"stitch\"]",
    "published_at": "",
    "created_at": "",
    "updated_at": "",
    "user": {
      "id": 4813,
      "first_name": "",
      "last_name": "",
      "nickname": "",
      "avatar": "",
      "bio": "",
      "tick": false,
      "is_followed": false,
      "followings_count": 0,
      "followers_count": 0,
      "likes_count": null,
      "website_url": "",
      "facebook_url": "",
      "youtube_url": "",
      "twitter_url": "",
      "instagram_url": ""
    },
    "meta": {
      "file_size": 1582765,
      "file_format": "mp4",
      "mime_type": "video/mp4",
      "playtime_string": "0:07",
      "playtime_seconds": 6.6,
      "bitrate": 1908113.9393939395,
      "video": {
        "dataformat": "quicktime",
        "rotate": 0,
        "resolution_x": 576,
        "resolution_y": 1024,
        "fourcc": "avc1",
        "fourcc_lookup": "H.264/MPEG-4 AVC",
        "frame_rate": 30
      }
    }
  },
]

const responseSuggest = [
    {
        "id": 0,
        "first_name": "admin",
        "last_name": "",
        "nickname": "admin",
        "avatar": "",
        "tick": true,
        "is_followed": false,
        "followings_count": 0,
        "followers_count": 0,
        "likes_count": 0,
        "website_url": "",
        "facebook_url": "",
        "youtube_url": "",
        "twitter_url": "",
        "instagram_url": "",
        "created_at": "2022-08-22 00:03:34",
        "updated_at": "2022-10-22 15:58:33",
        "popular_video": {
          "id": null,
          "uuid": "b6a6fcf6-2972-41c9-859c-db6397d8c203",
          "user_id": null,
          "type": "",
          "thumb_url": "",
          "file_url": "",
          "music": "",
          "description": "",
          "is_liked": null,
          "likes_count": 0,
          "comments_count": 0,
          "shares_count": 0,
          "views_count": 0,
          "published_at": "2022-10-20 22:41:55",
          "created_at": "2022-10-20 22:41:55",
          "updated_at": "2022-10-20 22:41:57",
          "meta": {
            "file_size": 3936481,
            "file_format": "mp4",
            "mime_type": "video/mp4",
            "playtime_string": "0:28",
            "playtime_seconds": 28.467,
            "bitrate": 1092754.9794498894,
            "video": {
              "dataformat": "quicktime",
              "rotate": 0,
              "resolution_x": 576,
              "resolution_y": 1024,
              "fourcc": "avc1",
              "fourcc_lookup": "H.264/MPEG-4 AVC",
              "frame_rate": 60
            }
          }
        }
      },
]

const responseSearch =[
    {
        "id": null,
        "first_name": "",
        "last_name": "",
        "full_name": "",
        "nickname": "",
        "avatar": "",
        "bio": "",
        "tick": false,
        "followings_count": 0,
        "followers_count": 0,
        "likes_count": 0,
        "website_url": "",
        "facebook_url": "",
        "youtube_url": "",
        "twitter_url": "",
        "instagram_url": "",
        "created_at": "2022-12-23 00:12:36",
        "updated_at": "2023-02-20 20:34:45"
      },
]

function  Replication (data, number){
  const arrayData=[]
  for (let i= 0; i < number;i++){
    arrayData.push(...data)
  }
  return arrayData
}
const responseVideoError = Replication(responseVideo,6)
const responseSuggestError = Replication(responseSuggest,5)
const responseSearchError = Replication(responseSearch,3)


export {responseVideoError,responseSuggestError,responseSearchError}