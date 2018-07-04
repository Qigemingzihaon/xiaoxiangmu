new Vue({
  el:'#body1235',
  data: {
    suijidlid:'2018-6-10134203',
    passwd:'a12345',
    regexqtel:'^[1][3,4,5,7,8][0-9]{9}$',
    regexqid:'^[\\d]{4}[\-]{1}[\\d]{1,2}[\-]{1}[\\d]{8}$',
    regexqpw:'^[a-z0-9_\.-]{6,16}$',
  },
  methods: {
    login: function (event) {
      var data={};
      if(this.suijidlid==""){
        alert('账号为空')
        return
      }else if(this.passwd==''){
        alert('密码为空')
        return
      }
      if(!new RegExp(this.regexqid).test(this.suijidlid)){
        // //允许手机登录
        // if(!new RegExp(this.regexqtel).test(this.suijidlid)){
        //   // console.log("telno")
        //   alert('账号格式不对')
        //   return
        // }else{
        //   // console.log("telok")
        //   data['tel']=this.suijidlid;
        // }
      }else{
        // console.log("idok")
        data['suijidlid']=this.suijidlid;
      }
      if(!new RegExp(this.regexqpw).test(this.passwd)){
        // console.log("pws")
        alert('密码格式不对')
        return
      }else{
        data['passwd']=this.passwd;
      }
      // console.log(data);
      axios.post('/tijiao/dl',data
      )
      .then(function(response){
        // console.log(response);
        if(response.data.r=='ok'){
          // alert('ok')
          window.location.href='/dlwl'
        }else if(response.data.r=='tel-exist'){
          alert('电话未注册')
        }else if(response.data.r=='id-exist'){
          alert('账号不存在')
        }else if(response.data.r=='pw-exist'){
          alert('密码错误')
        }else{
          console.log('数据库错误')
        }
        
      })
      .catch(function(error){
        console.log(error);
      });
    }}
})