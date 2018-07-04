window.onload = function () {
  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '11',
      datatj: [{
          username: '',
          hint: 'お名前',
          regexq: '^[\u4E00-\u9FA5]{2,}[\ ]{1}[\u4E00-\u9FA5]{2,}$'
        },
        {
          usernamep: '',
          hint: 'フリガナ',
          regexq: '^[\u4E00-\u9FA5]{2,}[\ ]{1}[\u4E00-\u9FA5]{2,}$'
        },
        {
          postcode: '',
          hint: '郵便番',
          regexq: '^[\\d]{6}$'
        },
        {
          shi: '',
          hint: '都道府県',
          regexq: '2'
        },
        {
          qu: '',
          hint: '住所（市区町村、丁目、番地）',
          regexq: '^[\u4E00-\u9FA5]{2,}$'
        },
        {
          xiangxi: '',
          hint: '住所（マンション名・部屋番号）',
          regexq: '(^[\u4E00-\u9FA5]{2,}$)|(^[\u4E00-\u9FA5]{2,}[\\d]{1,}[\u4E00-\u9FA5]{1,}$)'
        },
        {
          tel: '',
          hint: 'お電話番号',
          regexq: '^[1][3,4,5,7,8][0-9]{9}$'
        },
        {
          email: '',
          hint: 'メールアドレス',
          regexq: '^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$'
        },
        {
          email2: '',
          hint: 'メールアドレス再入力',
          regexq: 'email2'
        },
        {
          sexType: '',
          hint: '性別',
          regexq: 'sex'
        },
        {
          year: '',
          hint: 'ご生年',
          regexq: 'year'
        },
        {
          month: '',
          hint: 'ご生月',
          regexq: '(^[1-9]{1}$)|(^1[0-2]$)|(^0[1-9]$)'
        },
        {
          passwd: '',
          hint: 'パスワード',
          regexq: '^[a-z0-9_\.-]{6,16}$'
        },
        {
          passwd2: '',
          hint: '再入力パスワード',
          regexq: 'passwd2'
        },
        {
          passwdwt: '',
          hint: 'パスワードヒント',
          regexq: '2'
        },
        {
          passwdwtda: '',
          hint: 'パスワードヒント答え',
          regexq: '2'
        },
        {
          mail_magazine_flg: '',
          hint: 'メール配信の有無',
          regexq: '2'
        }
      ],
    },
    created: function () {
      var THis = this;
      data = THis.datatj;
      // 获取信息
      axios.post('/tijiao/huoquxxz', {})
        .then(function (response) {
          // console.log(response);
          // console.log(response.data.r)
          var da = response.data.r;
          for (var index = 0; index < data.length; index++) {
            for (var objvle in data[index]) {
              if (objvle == 'hint' || objvle == 'regexq') {
                //
              } else {
                if (objvle == "shi") {
                  data[index][objvle] = da["shizhi"];
                }else if (objvle == "sexType") {
                  if(da["sexType"]=="1"){
                    data[index][objvle] = "男性";
                  }else{
                    data[index][objvle] = "女性";
                  }
                }else if (objvle == "mail_magazine_flg") {
                  if(da["mail_magazine_flg"]=="0"){
                    data[index][objvle]="希望する";
                  }else{
                    data[index][objvle]="希望しない";
                  }
                }else if (objvle == "passwdwt") {
                  data[index][objvle] = da["passwdwtzhi"];
                }else {
                  data[index][objvle] = da[objvle];
                }
              }
            }
          }
          THis["suijidlid"]=da["suijidlid"];
          // console.log(THis)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      qued: function (event) {
        //保存
        axios.post('/tijiao/baochungg', {})
          .then(function (response) {
            if (response.data.r == 'ok') {
              window.location.href = '/YAMANOMUSICOnline'
              console.log(666)
            } else {
              alert('信息错误')
            }

            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  })
}