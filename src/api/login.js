import service from '@/utils/ajax'
export async function login(data){
    return await service({
        url:'/api/passport',
        method:'post',
        data
    })
}