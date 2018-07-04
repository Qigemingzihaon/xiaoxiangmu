window.onload = function () {
  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '',
      datatj: [{
          tel: '13423451234',
          hint: 'お電話番号',
          regexq: '^[1][3,4,5,7,8][0-9]{9}$'
        },
        {
          email: 'onlineshop@yamano.co',
          hint: 'メールアドレス',
          regexq: '^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$'
        }
      ],
    },
    methods: {
      huoquzh: function (event) {
        var data = {};
        if (this.datatj[0].tel == "") {
          alert('电话为空')
          return
        } else if (this.datatj[1].email == "") {
          alert('邮箱为空')
          return
        }
        if (!new RegExp(this.datatj[0].regexq).test(this.datatj[0].tel)) {
          // console.log("pws")
          alert('电话格式不对')
          return
        };
        if (!new RegExp(this.datatj[1].regexq).test(this.datatj[1].email)) {
          // console.log("pws")
          alert('邮箱格式不对')
          return
        }
        data['tel']=this.datatj[0].tel;
        data['email']=this.datatj[1].email;

        // console.log("idok")
        console.log(data);
        axios.post('/tijiao/zhaohuizh', data)
          .then(function (response) {
            console.log(response);
            if (response.data.r == 'ok') {
              alert('邮箱查看账号')
              window.location.href = '/dl'
            } else if (response.data.r == 'no') {
              alert('电话与邮箱不匹配')
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