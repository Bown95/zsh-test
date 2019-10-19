import service from '@/utils/ajax'
export async function forget(data){
    return await service({
        url:'/api/SetPassword',
        method:'post',
        data
    })
}