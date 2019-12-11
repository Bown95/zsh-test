import service from '@/utils/ajax'
export async function orderList(params){
    return await service({
        url:'/api/UserOrderList',
        params
    })
}

export  function orderdetail(params){
   // alert('调用后台接口获取订单详情')
    return  service({
        url:'/api/UserOrderInfo',
        params
    })
}

export async function weixinpay(data){
    return await service({
        url:'/api/weixinpay/WXACreatePayCode',
        method:'post',
        data
    })
}
//支付宝接口
export async function alipay(data){
        return await service({
            url:'/api/alipay/createwappay',
            method:'post',
            data
        })
}