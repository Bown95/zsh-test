import service from '@/utils/ajax'
export async function houseList(params){
    return await service({
        url:'/api/UserHouseList',
        params
    })
}

