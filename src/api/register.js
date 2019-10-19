import service from '@/utils/ajax'
export async  function register(data){
    return await service({
        url:'/api/Register',
        method:'post',
        data
    })
}
export async function sms(data){
    return await service({
        url:'/api/sms',
        method:'post',
        data
    })
}