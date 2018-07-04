window.onload = function () {
  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '',
      passwdwt: '',
      passwdwtda:'',
      passwdwt1:["ヒントを選んでください","好きなアーティストは？",
      "一番初めに買ったCDは？","卒業した小学校の名前は？","両親の旧姓は？","飼っているペットの名前は？"],
      regexqtel: '^[1][3,4,5,7,8][0-9]{9}$',
      regexqid: '^[\\d]{4}[\-]{1}[\\d]{1,2}[\-]{1}[\\d]{8}$',
      regexqpw: '^[a-z0-9_\.-]{6,16}$',
    },
    created: function () {
      var THis = this;
      axios.post('/tijiao/huoquwt', {})
          .then(function (response) {
            console.log(response);
            if (response.data.r) {
              // alert('ok')
              THis["passwdwt"]=THis["passwdwt1"][response.data.r]
              // window.location.href = '/wjmm2'
            }else{
              window.location.reload()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    methods: {
      login: function (event) {
        var data = {};
        if (this.passwdwtda == "") {
          alert('答案为空')
          return
        }
        // console.log("idok")
        data['passwdwtda'] = this.passwdwtda;
        console.log(data);
        axios.post('/tijiao/tijiaodaan', data)
          .then(function (response) {
            console.log(response);
            if (response.data.r == 'ok') {
              // alert('ok')
              window.location.href = '/wjmm2'
            } else if (response.data.r == 'no') {
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