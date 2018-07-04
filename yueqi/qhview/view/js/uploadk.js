$(document).ready(function() {
	var lujin='';
    var mingc='';
    console.log(6666)
    $('#submit-button').on('click', function() {
        console.log(666)
        var This = $(this);
        var myPhoto = This.prev('input')[0].files;
        console.log(myPhoto)
        var oMyForm = new FormData();
        oMyForm.append("name", 'yinpin');
        oMyForm.append("name1", 'img1');
        
        for (var i = 0; i < myPhoto.length; i++) {
            oMyForm.append('userfile', myPhoto[i]);
        }
        //    oMyForm.append("userfile", myPhoto);


        // $.ajax({
        //     type: 'POST',
        //     url: '/admin/upload/wjUpload',
        //     cache: false, //不需要缓存
        //     processData: false, //不需要进行数据转换
        //     contentType: false, //默认数据传输方式是application,改为false，编程multipart
        //     data: oMyForm,
        //     dataType: 'json'
        // }).done(function(data) {
        //     console.log(data);
        //     This.next('input').val(data.uploadPath);
        //     lujin=data.uploadPath;
        //     mingc=data.uploadname;
        //     alert(data.errMsg);
        // }).fail(function(err) {
        //     console.log(err);
        // });
    });
    
//     $('#chuangjian').on('click',function(){
//     	var This = $(this);
//     	var Ddirname=$("#dirname").val();
//     	$.ajax({
//             url: '/admin/upload/dengyi',
//             type: 'POST',
//             data: { dir: Ddirname },
//             dataType: 'JSON',
//             success: function(data) {
//                 console.log(data);
//                 if (data.r == 'ok') {
//                     alert('添加成功！');
//                     This.next().val(data.dirname);
// //                  window.location.href = "./catelist";
//                 } else if (data.r == 'no') {
//                     alert('已存在！');
// //                  window.location.href = "./catelist";
//                 }
//             },
//             error: function() {
//                 console.log('error');
//             }
//         });
    	
//     });
//     $("#shangchuanmysql").on("click",function(){

//     	 var xingxi=$("#xingxi").serializeArray();
//     	 if(lujin==""||mingc==""){
//     	 	return
//     	 }else{
//     	 	 xingxi.push({"name":"mingc","value":mingc});
//     	     xingxi.push({"name":"lujin","value":lujin});
//     	 }
    	 
// 		$.ajax({
//             url: '/admin/upload/baocsj',
//             type: 'POST',
//             data: xingxi,
//             dataType: 'JSON',
//             success: function(data) {
//                 console.log(data);
//                 if (data.r == 'ok') {
//                     alert('添加成功！');

// //                  window.location.href = "./catelist";
//                 } else if (data.r == 'no') {
//                     alert('已存在！');
// //                  window.location.href = "./catelist";
//                 }
//             },
//             error: function() {
//                 console.log('error');
//             }
//         });	
//     	 console.log(xingxi)
//     });
    
});