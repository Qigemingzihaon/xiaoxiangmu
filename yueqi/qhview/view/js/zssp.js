new Vue({
  el: '#body1235',
  data: {
    suijidlid: '',
    imgindex: 0,
  },
  methods: {
    chtp: function (event, i) {
      console.log(i)
    },
    tjgwc: function (event, i) {
      console.log(i);
      var data = {
        pdpctid: i
      };
      axios.post('/tijiao/gouwuche', data)
        .then(function (response) {
          // console.log(response);
          if (response.data.r == 'ok') {
            alert('ok')
            // window.location.href = '/dlwl'
          }else if (response.data.r == 'dl') {
            alert('请登录')
          } else if (response.data.r == 'no') {
            alert('添加失败')
          } else {
            console.log('数据库错误')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    login: function (event) {
      var data = {};

      // console.log(data);
      // axios.post('/tijiao/dl', data)
      //   .then(function (response) {
      //     // console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    }
  }
})