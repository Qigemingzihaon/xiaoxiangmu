// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex);
new Vue({
  el: '#zcform',
  data: {
    datatj: [{
        username: '山田 太郎',
        hint: 'お名前',
        regexq: '^[\u4E00-\u9FA5]{2,}[\ ]{1}[\u4E00-\u9FA5]{2,}$'
      },
      {
        usernamep: '山田 太郎',
        hint: 'フリガナ',
        regexq: '^[\u4E00-\u9FA5]{2,}[\ ]{1}[\u4E00-\u9FA5]{2,}$'
      },
      {
        postcode: '123456',
        hint: '郵便番',
        regexq: '^[\\d]{6}$'
      },
      {
        shi: '2',
        hint: '都道府県',
        regexq: '2'
      },
      {
        qu: '金牛区',
        hint: '住所（市区町村、丁目、番地）',
        regexq: '^[\u4E00-\u9FA5]{2,}$'
      },
      {
        xiangxi: '以走哦0号',
        hint: '住所（マンション名・部屋番号）',
        regexq: '(^[\u4E00-\u9FA5]{2,}$)|(^[\u4E00-\u9FA5]{2,}[\\d]{1,}[\u4E00-\u9FA5]{1,}$)'
      },
      {
        tel: '13423451234',
        hint: 'お電話番号',
        regexq: '^[1][3,4,5,7,8][0-9]{9}$'
      },
      {
        email: 'onlineshop@yamano.co',
        hint: 'メールアドレス',
        regexq: '^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$'
      },
      {
        email2: 'onlineshop@yamano.co',
        hint: 'メールアドレス再入力',
        regexq: 'email2'
      },
      {
        sexType: '1',
        hint: '性別',
        regexq: 'sex'
      },
      {
        year: '1998',
        hint: 'ご生年',
        regexq: 'year'
      },
      {
        month: '1',
        hint: 'ご生月',
        regexq: '(^[1-9]{1}$)|(^1[0-2]$)|(^0[1-9]$)'
      },
      {
        passwd: 'a12345',
        hint: 'パスワード',
        regexq: '^[a-z0-9_\.-]{6,16}$'
      },
      {
        passwd2: 'a12345',
        hint: '再入力パスワード',
        regexq: 'passwd2'
      },
      {
        passwdwt: '2',
        hint: 'パスワードヒント',
        regexq: '2'
      },
      {
        passwdwtda: '1',
        hint: 'パスワードヒント答え',
        regexq: '2'
      },
      {
        mail_magazine_flg: '1',
        hint: 'メール配信の有無',
        regexq: '2'
      }
    ],
  },
  created: function () {
    var THis = this;
    data = THis.datatj;
    // 获取信息
    axios.post('/tijiao/huoqubcs', {})
      .then(function (response) {
        // console.log(response);
        // console.log(response.data.r)
        var da = response.data.r;
        if (da == "no") {

        } else {
          for (var index = 0; index < data.length; index++) {
            for (var objvle in data[index]) {
              if (objvle == 'hint' || objvle == 'regexq' || objvle == "passwd2" || objvle == "email2") {
                //
              } else {
                if (objvle == "passwd") {

                } else if (objvle == "shi") {
                  data[index][objvle] = da["shi"];
                } else if (objvle == "email") {
                  data[index][objvle] = da[objvle];
                  data[index + 1]["email2"] = da[objvle];
                } else {
                  data[index][objvle] = da[objvle];
                }
              }
            }
          }
          // console.log(THis)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    dengl: function (event) {
      var tijiaodata = this.datatj;
      var tjdata = {},
        datey = new Date,
        daten = '',
        trs = '';
      // console.log(tijiaodata.length)
      //验证信息
      for (var index = 0; index < tijiaodata.length; index++) {
        for (var objvle in tijiaodata[index]) {
          if (objvle == 'hint' || objvle == 'regexq') {
            //
          } else {
            if (objvle == "year" || objvle == "month" || objvle == "mail_magazine_flg") {
              daten = tijiaodata[index][objvle];
              if (daten == '') {
                tjdata[objvle] = daten;
              } else if (objvle == "year" && !daten == '') {
                trs = /^\d+$/;
                if (trs.test(daten)) {
                  if (datey.getFullYear() - daten > 90) {
                    alert('你是千年老妖怪么');
                    return;
                  } else if (datey.getFullYear() - daten < 18) {
                    alert('未成年');
                    return;
                  } else if (18 <= datey.getFullYear() - daten <= 90) {
                    tjdata[objvle] = daten;
                  }
                } else {
                  alert("请正确输入");
                  return
                }
              } else if (objvle == "month" && !daten == '') {
                trs = tijiaodata[index].regexq;
                // console.log(new RegExp(trs).test(daten));
                if (new RegExp(trs).test(daten)) {
                  tjdata[objvle] = daten;
                } else {
                  alert('月份格式不正确');
                  return
                }
              } else {
                tjdata[objvle] = daten;
              }
            } else if (objvle == tijiaodata[index].regexq) {
              trs = tijiaodata[index].regexq.slice(0, tijiaodata[index].regexq.length - 1);
              if (tijiaodata[index - 1][trs] == tijiaodata[index][objvle]) {
                tjdata[objvle] = tijiaodata[index][objvle];
              } else {
                alert(tijiaodata[index].hint);
                return
              }
            } else if (objvle == "sexType") {
              if (tijiaodata[index][objvle] == "") {
                tijiaodata[index][objvle] = 0;
                tjdata[objvle] = 0;
              } else {
                tjdata[objvle] = tijiaodata[index][objvle];
              }
            } else if (tijiaodata[index].regexq == "2") {
              // console.log(tijiaodata[index][objvle],index)
              if (tijiaodata[index][objvle] == "") {
                alert(tijiaodata[index].hint);
                return
              } else {
                if (objvle == 'shi' || objvle == 'passwdwt') {
                  console.log(11);
                  if (objvle == 'shi') {
                    var datatjid = document.getElementById("shi");
                    tjdata[objvle + "zhi"] = datatjid.options[datatjid.selectedIndex].text;
                    // console.log(datatjid.options[datatjid.selectedIndex].text);
                  } else if (objvle == 'passwdwt') {
                    var datatjid = document.getElementById("passwdwt");
                    tjdata[objvle + "zhi"] = datatjid.options[datatjid.selectedIndex].text;
                    // console.log(datatjid.options[datatjid.selectedIndex].text);
                  }
                }
                tjdata[objvle] = tijiaodata[index][objvle];
              }
            } else {
              trs = tijiaodata[index].regexq;
              if (new RegExp(trs).test(tijiaodata[index][objvle])) {
                tjdata[objvle] = tijiaodata[index][objvle];
                // tjdata[index]={[objvle]:tijiaodata[index][objvle]};
              } else {
                alert(tijiaodata[index].hint);
                return
              }
            }
          }
        }
      }
      // console.log(tijiaodata)

      console.log(tjdata)
      axios.post('/tijiao/zc', tjdata)
        .then(function (response) {
          if (response.data == 'ok') {
            window.location.href = '/zcnr'
          } else {
            alert('信息错误')
          }

          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      // `this` 在方法里指当前 Vue 实例
      // alert('Hello ' + this.mail_magazine_flg + '!')

    }
  }
})