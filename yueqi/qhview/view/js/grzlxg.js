window.onload = function () {
  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '',
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
      axios.post('/tijiao/huoquxx', {})
        .then(function (response) {
          // console.log(response);
          // console.log(response.data.r)
          var da = response.data.r;
          for (var index = 0; index < data.length; index++) {
            for (var objvle in data[index]) {
              if (objvle == 'hint' || objvle == 'regexq' || objvle == "passwd2" || objvle == "email2") {
                //
              } else {
                if (objvle == "passwd") {

                }else if (objvle == "shi") {
                  data[index][objvle] = da["shi"];
                }  else if (objvle == "email") {
                  data[index][objvle] = da[objvle];
                  data[index + 1]["email2"] = da[objvle];
                } else {
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
        var tijiaodata = this.datatj;
        var tjdata = {},
          datey = new Date,
          daten = '',
          trs = '';
        // console.log(tijiaodata.length)
        // console.log(this.suijidlid);
        tjdata["suijidlid"]=this.suijidlid;
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
              window.location.href = '/grzlxg1'
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