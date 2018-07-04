window.onload = function () {
  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '用户 名',
      p1id:'',
      datatj: [{
          usernames: '用户 名',
          hint: 'お届け先登録名',
          regexq: '^[\u4E00-\u9FA5]{1,}[\ ]{1}[\u4E00-\u9FA5]{1,}$'
        },
        {
          username: '用户 名',
          hint: 'お名前',
          regexq: '^[\u4E00-\u9FA5]{1,}[\ ]{1}[\u4E00-\u9FA5]{1,}$'
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
          xiangxi: '科华路99号',
          hint: '住所（マンション名・部屋番号）',
          regexq: '(^[\u4E00-\u9FA5]{2,}$)|(^[\u4E00-\u9FA5]{2,}[\\d]{1,}[\u4E00-\u9FA5]{1,}$)'
        },
        {
          tel: '13543649854',
          hint: 'お電話番号',
          regexq: '^[1][3,4,5,7,8][0-9]{9}$'
        }
      ],
    },
    created: function () {
      var THis = this;
      var data=THis.datatj;
      // 获取信息
      axios.post('/tijiao/huoquname', {})
        .then(function (response) {
          console.log(response);
          THis["suijidlid"]=response.data.nameyh;
          if(response.data.shdz){
            console.log(response.data.shdz[0]);
            THis["p1id"]=response.data.shdz[0].p1id;
            for (var index = 0; index < data.length; index++) {
              for (var objvle in data[index]) {
                if (objvle == 'hint' || objvle == 'regexq') {
                  //
                } else {
                  data[index][objvle] = response.data.shdz[0][objvle];
                }
              }
            }
          }else{
            THis["p1id"]='';
          }
          // // console.log(THis)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      qued: function (event) {
        var tijiaodata = this.datatj;
        var tjdata = {},trs = '';
        tjdata["p1id"]=this.p1id;
        //验证信息
        for (var index = 0; index < tijiaodata.length; index++) {
          for (var objvle in tijiaodata[index]) {
            if (objvle == 'hint' || objvle == 'regexq') {
              //
            } else {
              if (tijiaodata[index].regexq == "2") {
                // console.log(tijiaodata[index][objvle],index)
                if (tijiaodata[index][objvle] == "") {
                  alert(tijiaodata[index].hint);
                  return
                } else {
                  var datatjid = document.getElementById("shi");
                  tjdata[objvle + "zhi"] = datatjid.options[datatjid.selectedIndex].text;
                  // console.log(datatjid.options[datatjid.selectedIndex].text);
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
        console.log(tjdata);
        axios.post('/tijiao/shdzsn', tjdata)
          .then(function (response) {
            if (response.data== 'ok') {
              window.location.href = '/tjsh1'
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