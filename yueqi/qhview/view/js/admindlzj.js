window.onload = function () {


  Vue.directive('drag',function(){
    console.log(66)
    var oDiv=this.el;
    oDiv.onmousedown=function(ev){
        var disX=ev.clientX-oDiv.offsetLeft;
        var disY=ev.clientY-oDiv.offsetTop;

        document.onmousemove=function(ev){
            var l=ev.clientX-disX;
            var t=ev.clientY-disY;
            oDiv.style.left=l+'px';
            oDiv.style.top=t+'px';
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
        };
    };
});


  new Vue({
    el: '#body1235',
    data: {
      suijidlid: '用户名',
      shanchu:"删除",
      datatj: [{
        usernames: '',
        username: '',
        dz: '',
        tel: '',
        p1id: ''
      }],
    },
    methods: {
      biangeng: function ($event,p1id) {
        console.log(p1id)
        console.log("变更")
        axios.post('/admintj/baocpid', {p1id:p1id,FuncTion:"Change"})
          .then(function (response) {
            if (response.data == 'ok') {
              window.location.href = '/admin/admintjsh'
            } else {
              alert('信息错误')
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },open2:function ($event,pdpctid) {
        console.log(pdpctid)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("删除成功");
          var This=this;
          
          axios.post('/admintj/deletedz', {pdpctid:pdpctid})
          .then(function (response) {
            if (response.data == 'ok') {
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