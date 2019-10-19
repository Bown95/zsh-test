import service from '@/utils/ajax'
export async function getheader(){
    return await service({
        url:'/api/SystemEnum?type=EOrderState',
       
    })
}

