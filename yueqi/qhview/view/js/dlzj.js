window.onload = function () {
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
        axios.post('/tijiao/baocpid', {p1id:p1id,FuncTion:"Change"})
          .then(function (response) {
            if (response.data == 'ok') {
              window.location.href = '/tjsh'
            } else {
              alert('信息错误')
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },open2:function ($event,p1id) {
        console.log(p1id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("删除成功");
          var This=this;
          
          axios.post('/tijiao/deletedz', {p1id:p1id})
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