window.onload = function () {
  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '用户名',
      num1:2,
      shanchu:"删除",
      datatj: [],
    },created: function () {
      var THis = this;
      data = THis.datatj;
      // 获取信息
      axios.post('/tijiao/huoqugwc', {})
        .then(function (response) {
          console.log(response.data);
          if(response.data.r="ok"){
            THis.datatj=response.data.rn;
          }else{
            THis.datatj=[{gwc:'',aid:'',gwfs:'',money:'',product_pname:'',checked:false,p1id:'',shdz:[{p1id:'',xianshidz:''}]}]
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      tijiaodj:function (param) {  
        var This=this.datatj;
        var tijiaodata=[];
        var tishi='';
        console.log(tijiaodata.length)
        for(var index=0;index<This.length;index++){
          if(This[index].checked&&!This[index].p1id==''){
            tijiaodata.push(This[index]);
            console.log(This[index].shdz.filter(function (param) {return param.p1id==This[index].p1id}))
            dadz=This[index].shdz.filter(function (param) {return param.p1id==This[index].p1id})[0].xianshidz;
            tishi+='商品：'+This[index].product_pname+';数量：'+This[index].gwfs+';收货人信息：'+dadz;
          }
        }
        console.log(tijiaodata)
        if(tijiaodata.length>0){
          this.$confirm(tishi, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log("删除成功");
            axios.post('/tijiao/tongzhidianjia', {tongzhi:tijiaodata})
            .then(function (response) {
              if (response.data.r == 'ok') {
                // This.$message({
                //   type: 'success',
                //   message: '删除成功!'
                // });
                window.location.reload();
                // window.location.href = '/#'
              } else {
                alert('信息错误')
              }
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            });          
          });
        }
      },
      open2:function ($event,p1id) {
        console.log(p1id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("删除成功");
          var This=this;
          axios.post('/tijiao/deletegwc', {gwc:p1id})
          .then(function (response) {
            if (response.data.r == 'ok') {
              // This.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
              window.location.reload();
              // window.location.href = '/#'
            } else {
              alert('信息错误')
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
  })
}