window.onload = function () {
  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '',
      input3:'',
      passwd: '',
      passwd2:'',
      regexqpw: '^[a-z0-9_\.-]{6,16}$',
    },
    methods: {
      genggaimm: function (event) {
        var data = {};
        if (this.passwd == "") {
          alert('密码为空')
          return
        }else if (this.passwd2 == "") {
          alert('密码为空')
          return
        }
        if(!new RegExp(this.regexqpw).test(this.passwd)){
          // console.log("pws")
          alert('密码格式不对')
          return
        }else if(this.passwd2==this.passwd){
          data['passwd']=this.passwd;
        }else{
          alert('再入力パスワード不正确')
          return
        }
        
        // console.log("idok")
        console.log(data);
        axios.post('/tijiao/genggaimm', data)
          .then(function (response) {
            console.log(response);
            if (response.data == 'ok') {
              alert('ok')
              // window.location.href = '/wjmm2'
            } else if (response.data == 'no') {
              alert('答案错误')
            } else {
              console.log('数据库错误')
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  });


}