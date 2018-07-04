//js事件三要素：事件源、事件、事件处理函数
//$(function(){ });

$(document).ready(function() {

    //	登录
    $('.login').click(function() {
        //账号和密码必填
        var username = $('#username');
        var passwd = $('#passwd');
        if (!username.val()) {
            username.addClass('haserror');
            username.focus();
            return;
        }
        if (!passwd.val()) {
            passwd.addClass('haserror');
            passwd.focus();
            return;
        }

        //如果没有问题，直接进行数据验证
        $.ajax({
            url: './loginsubmit', //请求地址
            type: 'POST', //数据提交类型 
            async: true,
            data: $('#login').serialize(), //提交的数据
            dataType: 'JSON', //返回的数据类型
            success: function(data) {
                if (data.r == 'pw_error') {
                    alert('密码错误');
                    passwd.addClass('haserror');
                    passwd.focus();
                } else if (data.r == 'username_no_exist') {
                    alert('账号不存在');
                    username.addClass('haserror');
                    username.focus();
                } else if (data.r == 'ok') {
                    alert('登录成功!');
                    window.location.href = './addcate';
                } else {
                    alert('未知错误，请刷新后重新登录');
                    window.location.reload();
                }
                console.log(data);
            },
            error: function() {
                console.log('error');
            }
        });

    });

    //  添加项目
    // $('.addcate').click(function(){
    // 	var catename = $('#catename');
    // 	if(!catename.val()){
    // 		catename.parent().parent().addClass('error');
    // 		catename.next('span').html('*必填');
    // 		return ;
    // 	}else{
    // 		catename.parent().parent().removeClass('error');
    // 		catename.next('span').html('');
    // 	}
    // 	//开始处理数据
    // 	$.ajax({
    // 		url:'./addcatesubmit',
    // 		type:'POST',
    // 		data:{catename:$('#catename').val()},
    // 		dataType:'JSON',
    // 		success:function(data){
    // 			console.log(data.r);
    // 			console.log(111,data);
    // 			if(data.r == 'ok'){
    // 				alert('添加成功！');
    // 				window.location.href="./catelist";
    // 			}else if(data.r=='err'){
    // 				alert('项目名存在！');
    // 			}else{
    // 				alert(data);
    // 			}
    // 		},
    // 		error:function(){
    // 			console.log('error');
    // 		}
    // 	});
    // });


});