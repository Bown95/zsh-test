import service from '@/utils/ajax'
export async function person(fetch){
    return await service({
        url:'/api/passport?token='+fetch,
    })
}