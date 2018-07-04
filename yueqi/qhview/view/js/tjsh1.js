window.onload = function () {
  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '',
      datatj: [{
          usernames: '',
          hint: 'お届け先登録名',
          regexq: '^[\u4E00-\u9FA5]{1,}[\ ]{1}[\u4E00-\u9FA5]{1,}$'
        },
        {
          username: '',
          hint: 'お名前',
          regexq: '^[\u4E00-\u9FA5]{1,}[\ ]{1}[\u4E00-\u9FA5]{1,}$'
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
        }
      ],
    },
    created: function () {
      var THis = this;
      data = THis.datatj;
      // 获取信息
      axios.post('/tijiao/huoqudzsn', {})
        .then(function (response) {
          console.log(response);
          console.log(response.data.r);
          var da = response.data.r;
          for (var index = 0; index < data.length; index++) {
            for (var objvle in data[index]) {
              if (objvle == 'hint' || objvle == 'regexq') {
                //
              } else {
                if (objvle == "shi") {
                  data[index][objvle] = da["shizhi"];
                }else {
                  data[index][objvle] = da[objvle];
                }
              }
            }
          }
          THis["suijidlid"]=da["grname"];
          // // console.log(THis)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      qued: function (event) {
        var tijiaodata = this.datatj;
        //验证信息
        
        console.log(111);

        axios.post('/tijiao/shdzbc', {})
          .then(function (response) {
            if (response.data.r == 'ok') {
              window.location.href = '/dlzj'
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