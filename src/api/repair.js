import service from '@/utils/ajax'
export async function repair(data){
    return  await service({
        url:'/api/MaintainOrder',
        method:'post',
        data
    })
}
//获取保障记录
export async function getrepair(params){
    return  await service({
        url:'/api/MaintainOrderList',
        params
    })
}

export async function getheader(){
    return await service({
        url:'/api/SystemEnum?type=EMaintainOrderState',
       
    })
}