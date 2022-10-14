import request from '@/utils/request'

export const reqLikeList = (limit)=>request({url:`/personalized?limit=${limit}`})

export const reqGetNewMusic = ()=>request({url:'/personalized/newsong'})

export const reqHotSearch = ()=>request({url:'/search/hot'})

export const reqSearchResult = (keyWord,number,offset)=>request({url:`/cloudsearch?keywords=${keyWord}&type=${number}&offset=${offset}`})

export const reqSuggestion = (keyword)=>request({url:`/search/suggest?keywords=${keyword}&type=mobile`})

// export const reqValidateCode = (phone)=>request({url:`/captcha/sent?phone=${phone}`})

// export const validateData = (phone,code)=>request({url:`/captcha/verify?phone=${phone}&captcha=${code}`})

//密码登录
export const reqLogin = (phone,code)=>request({url:`/login/cellphone?phone=${phone}&password=${code}`})

export const getBanner = ()=>request({url:`/banner?type=2`})

export const reqGetComments = (id,limit,offset)=>request({url:`/comment/music?id=${id}&limit=${limit}&offset=${offset}`})

export const reqMlist = (id)=>request({url:`/playlist/detail?id=${id}`})


// 播放页 - 获取歌曲详情
export const getSongById = (id) => request({
  url: `/song/detail?ids=${id}`,
  method: "GET"
})

// 播放页 - 获取歌词
export const getLyricById = (id) => request({
  url: `/lyric?id=${id}`,
  method: "GET"
})


