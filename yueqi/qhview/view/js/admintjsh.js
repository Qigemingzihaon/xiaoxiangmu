window.onload = function () {
  // var Showbo = require("exports?Showbo!./path/to/showbo.js");

  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '用户 名',
      pdpctid:'',
      ok: false,
      deleteimg: [],
      pdtpid: '',
      uploadname: '',
      uploadPath: '',
      datatj: [{
          product_pname: '吉他',
          hint: '产品名',
          regexq: '^[a-z0-9_\u4E00-\u9FA5]{1,}$'
        },
        {
          suggestmoney: '￥1999',
          hint: '厂家建议售价',
          regexq: '^[￥$\\d]{1,}$'
        },
        {
          money: '$1800',
          hint: '店铺售价',
          regexq: '^[￥$\\d]{1,}$'
        },
        {
          pdtid: '2',
          hint: '产品分类',
          regexq: '2'
        },
        {
          particular: '详细介绍',
          hint: '详细介绍',
          regexq: '2'
        },
        {
          shopid: '科华路99号',
          hint: '商铺地址',
          regexq: '(^[\u4E00-\u9FA5]{2,}$)|(^[\u4E00-\u9FA5]{2,}[\\d]{1,}[\u4E00-\u9FA5]{1,}$)'
        },
        {
          shotel: '13543649854',
          hint: '联系お電話番号',
          regexq: '^[1][3,4,5,7,8][0-9]{9}$'
        },
        {
          imgurl: ['/img33/20180630140815_793007.jpg'],
          hint: '图片地址',
          regexq: '2'
        }
      ],
    },
    created: function () {
      var THis = this;
      var data = THis.datatj;
      // 获取信息
      axios.post('/admintj/huoquname', {})
        .then(function (response) {
          console.log(response);
          
          THis["suijidlid"] = response.data.nameyh;
          if (response.data.shdz&&!response.data.shdz[0]=='') {
            THis.ok = true;
            console.log(response.data.shdz);
            // THis["p1id"] = response.data.shdz[0].p1id;
            THis['pdpctid']=response.data.shdz[0].pdpctid;
            for (var index = 0; index < data.length; index++) {
              for (var objvle in data[index]) {
                if (objvle == 'hint' || objvle == 'regexq') {
                  //
                } else if (objvle == 'imgurl') {
                  data[index][objvle] = response.data["imgurl"];
                } else {
                  data[index][objvle] = response.data.shdz[0][objvle];
                }
              }
            }
          } else {
            THis["p1id"] = '';
          }
          console.log(THis)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      drag: function (event, index, $delce) {
        console.log(index)
        if ($delce == 'del') {
          dom = index;
        } else {
          dom1 = index;
        }
      },
      drop: function (event, $delce) {
        if ($delce == 'cexiao') {
          console.log(666)
          this.datatj[7].imgurl.push(this.deleteimg.splice(dom1, 1)[0])
        } else {
          // console.log(this.datatj[7].imgurl.splice(dom,1)[0])

          this.deleteimg.push(this.datatj[7].imgurl.splice(dom, 1)[0]);
        }
        console.log(this.deleteimg)

        event.preventDefault();
        //  event.target.appendChild(dom);
      },
      allowDrop: function (event) {
        event.preventDefault();
      },
      qued: function (event) {
        var tijiaodata = this.datatj;
        var tjdata = {},
          trs = '';
        tjdata["pdtpid"] = this.pdtpid;
        tjdata["pdpctid"] = this.pdpctid;
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
                  // var datatjid = document.getElementById("shi");
                  // tjdata[objvle + "zhi"] = datatjid.options[datatjid.selectedIndex].text;
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
        axios.post('/admin/upload/baocsj', tjdata)
          .then(function (response) {
            if (response.data.r == 'ok') {
              console.log(66)
              if (response.data.r1.length) {
                alert(response.data.r1)
              }
              window.location.href = '/admin/adminshangp'
            } else {
              alert('信息错误')
            }
            // console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      uploadk: function (event) {
        var This = this;
        var baochunimgurl=This.datatj[7].imgurl;

        // var imgurl = This.datatj[7].imgurl;
        console.log(666);
        This.datatj[7].imgurl = '';
        var myPhoto = document.getElementById('submit-button').files;
        console.log(myPhoto)
        var oMyForm = new FormData();
        oMyForm.append("name", 'yinpin');
        oMyForm.append("name1", 'img1');
        for (var i = 0; i < myPhoto.length; i++) {
          if (myPhoto[i].size > 10145728) {
            alert('请选择3M以内的图片！');
            return
          }
          oMyForm.append('userfile', myPhoto[i]);
        }
        // oMyForm.append("userfile", myPhoto);
        axios.post('/admin/upload/wjUpload', oMyForm, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function (response) {
            console.log(response.data);
            if (response.data.errCode == 1) {
              // alert('ok')
              This.ok = false;
              This.uploadPath = response.data.uploadPath;
              This.uploadname = response.data.Tuploadname;
              console.log(baochunimgurl)
              This.datatj[7].imgurl = response.data.uploadPath;
              if(baochunimgurl[0].pdpcimgid){
                for(var i=0;i<baochunimgurl.length;i++){
                  console.log(baochunimgurl[i].imgurl.slice(8))
                  This.datatj[7].imgurl.push(baochunimgurl[i].imgurl.slice(8))
                }
                
              }
              // window.location.href = '/dlwl'
              console.log(This)
            } else {
              alert("上传失败")
              console.log('数据库错误')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  })
}