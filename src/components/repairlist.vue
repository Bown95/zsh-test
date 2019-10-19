<template>
        <ul class="content_tpx">
                <li v-for="item in list" :key="item.id" >
                
                      <p class="paymentv_top"> <span> {{item.create_date}}</span> <span v-if="item.order_state==1" style="color:#ff8529;">待处理</span>  <span v-if="item.order_state==2" style="color:#349e0b;">已处理</span> </p>
                      <div class="line_top"></div>
                    <div class="box">
                        <p >{{item.content}}</p>
                    </div>
                     <div class="bossss" v-if="item.order_state==2&&item.reply_content">
                        <p >回复:&nbsp {{item.reply_content}}</p>
                    </div>
                </li>
          </ul>
</template>

<script>

export default {

  props:['list'],
 
}
</script>

<style lang='less' scoped>
    .content_tpx {
          width: 700px;
          
          margin: 0 auto;
          padding-top:7px;
          .bossss {
            background: #F3FEEF;
            color: #349E0B;
            padding-top: 10px;
            padding-left: 10px;
            min-height: 93px;
            font-size: 0.346667rem;
            line-height: 0.49rem;
            word-break: break-all;
          }
          .line {
              height:26px;
              position: absolute;
              display: inline-block;
               width:1Px;
               background:#ccc;
               top:-5px;
               margin:10px;
          }
          .paymentv-box {
            padding-left: 30px;
          }
          li {
            
              padding: 26px 26px 20px;
               margin-top:20px;
              width: 700px;
             
              border-radius: 8px;
              background: #fff;
          .paymentv_top {
              color: #1c1b1b;
              font-size: 30px;
              display: flex;
           // line-height: 30px;
            padding-bottom: 30px;
              justify-content: space-between;
             
          }
          
        
          }
            .line_top {
              /* 这是模拟的边框 */
            width: 700px;
            height: 1Px;
            background:#eee;
            margin-left: -26px;
          }
          .box {
          
           p {
              font-size: 26px;
              color: #1c1b1b;
           
              padding: 26px 26px 30px;
              padding-left: 0;
              line-height: 43px;
             word-break: break-all;
           }

          .box_title {
            background: #f3feef;
            width: 640px;
            color: #349e0b;
            padding:15px 20px 45px;;
            font-size: 24px;
            border-radius: 5px;
          }

            .btn {
              width: 120px;
              margin-top:30px;
              height: 46px;
              line-height: 42px;
              border:1Px solid #3399ff;
              text-align: center;
              font-size: 26px;
              color: #3399ff;
              border-radius: 21px;
              

            }

          }

      }
</style>
<style lang="less">

</style>