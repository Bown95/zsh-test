import service from '@/utils/ajax'


export async function detail(query){
    return await service({
        url:'/api/ArticleInfo?id='+query,
    })
}
