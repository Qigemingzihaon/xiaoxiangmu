// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex);


new Vue({
  el:'#body1235',
  data: {
    datatj:[{shi:"02"}]
  },
  methods: {
    oklogin: function (event) {
      // console.log(666);
      axios.post('/tijiao/zcqr',{zcqr:'ok'}
      )
      .then(function(response){
        // console.log(response);
        if(response.data.r=='ok'){
          // alert('ok')
          window.location.href='/zcwc'
        }else if(response.data.r=='tel-exist'){
          alert('电话已注册')
        }
        
      })
      .catch(function(error){
        console.log(error);
      });
    }}
})