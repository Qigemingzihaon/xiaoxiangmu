$(document).ready(function() {
    $('.addcate').click(function() {
        var catename = $('#catename');
        if (!catename.val()) {
            catename.parent().parent().addClass('error');
            catename.next('span').html('*必填');
            return;
        } else {
            catename.parent().parent().removeClass('error');
            catename.next('span').html('');
        }
        //开始处理数据
        $.ajax({
            url: './addcatesubmit',
            type: 'POST',
            data: { catename: $('#catename').val() },
            dataType: 'JSON',
            success: function(data) {
                console.log(data);
                if (data.r == 'ok') {
                    alert('添加成功！');
                    window.location.href = "./catelist";
                } else if (data.r == 'no') {
                    alert('已存在！');
                    window.location.href = "./catelist";
                }
            },
            error: function() {
                console.log('error');
            }
        });
    });

    //编辑数据
    $('.editcate').click(function() {
        var catename = $('#catename');
        if (!catename.val()) {
            catename.parent().parent().addClass('error');
            catename.next('span').html('*必填');
            return;
        } else {
            catename.parent().parent().removeClass('error');
            catename.next('span').html('');
        }
        console.log(66)
            //开始处理数据
        $.ajax({
            url: './editcatesubmit',
            type: 'POST',
            data: { catename: $('#catename').val(), cid: $('#cid').val() },
            dataType: 'JSON',
            success: function(data) {
                console.log(data);
                if (data.r == 'ok') {
                    alert('修改成功！');
                    window.location.href = "./catelist";
                }
            },
            error: function() {
                console.log('error');
            }
        });
    });
    //删除操作
    $('.delcate').click(function() {
        var $data = {};
        if ($(this).attr('dele') == 0) {
            if (!confirm('确认保存')) {
                $(this).hide();
                window.location.reload();
                return;
            }
            $(this).hide();
            $data = { cid: $(this).attr('cid'), dele: 0, val: $(this).parent().parent().find(".hidden-phone").html() };
        } else if ($(this).attr('dele') == 1) {
            $data = { cid: $(this).attr('cid'), dele: $(this).attr('dele') };
            if (!confirm('删除不可恢复，请确认')) {
                return;
            }
        } else {
            $data = { cid: $(this).attr('cid'), dele: 0 };
            $(this).next().show();
            $(this).parent().parent().find(".hidden-phone").attr("contenteditable", true).focus();
            return
        }
        $.ajax({
            url: './delcate',
            type: 'POST',
            data: $data,
            dataType: 'JSON',
            success: function(data) {
                console.log(data);
                if (data.r == 'ok') {
                    alert('删除成功！');
                    window.location.reload();
                } else if (data.r == 'ok1') {
                    alert('保存成功！');
                    window.location.reload();
                }
            },
            error: function() {
                console.log('error');
            }
        });
    });
});