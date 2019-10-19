import service from '@/utils/ajax'

export async function test(){
    /* 测试用的 */
    return await service({
        url:'/api/ArticleInfo',
        method:'get',
        params:1
    })
}
export async function fetchlist(params){
    return await service({
        url:'/api/articlelist',
        method:'get',
        params
    })
}
