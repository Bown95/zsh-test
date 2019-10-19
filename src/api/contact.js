import service from '@/utils/ajax'
export  async function contact(data){
    return await service({
        url:'/api/FeedBackInfo',
        method:'post',
        data
    })
}