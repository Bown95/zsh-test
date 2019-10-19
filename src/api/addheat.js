import service from '@/utils/ajax'
export async function defaultcity(){
    return await service({
        url:'/api/citylist?default_province_id=1654&default_city_id=1655',
    })
}
export async function pickercity(params){
    return await service({
        url:'/api/citylist',
        params
    })
}
export async function mchanismList (id){
    return await service({
        url:'/api/MechanismList?area_id='+id,
        
    })
}

export async function bindheat (params){
    return await service({
        url:'/api/UserBindHeatNo',
        params,
        method:'get', 
    })
}
//添加热力编号
export async function addheat (data){
    return await service({
        url:'/api/UserBindHeatNo',
        data,
        method:'post',    
    })
}
