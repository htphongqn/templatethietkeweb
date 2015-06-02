$(document).ready(function () {
    var userid = $('.shopuserid').val();

    var commentid = '';

    $('.gotoLikeShop').click(function () {
        if (userid > 0) {
            $(".shopuseraction").val('processLikeShop');
            document.forms[0].submit();
        }
        else {
            var modal = $find("lbtLogin");
            modal.show();
        }
    });

    $('.gotoLikeProduct').click(function () {
        if (userid > 0) {
            $(".shopuseraction").val('processLikeProduct');
            document.forms[0].submit();
        }
        else {
            var modal = $find("lbtLogin");
            modal.show();
        }
    });

    $('.gotoPostComment').click(function () {
        if (userid > 0) {

            if ($(".content-comment").val() != 'Ý kiến của bạn') {
                $(".shopuseraction").val('processPostComment');
                document.forms[0].submit();
            }
            else {
                alert('Nội dụng phản hồi không được trống!')
            }
        }
        else {
            var modal = $find("lbtLogin");
            modal.show();
        }
    });

    $('.gotoPostRecomment').click(function () {

        var flag = true;
        var str = "";

        if ($(".shop-Recomment").val() == '') {
            flag = false;
            str = "Nội dung không được bỏ trống!";
        }

        if (!flag) {
            $(".shop-error").html(str);
            return false;
        }
        else {
            $(".shopuseraction").val('processPostReComment');
            //alert(commentid);
            $(".CommentIDParent").val(commentid);
            document.forms[0].submit();
        }

    });


    //gotoPostRecomment

    $('.gotoRecomment').click(function () {
        var value = $(this).attr("id");
        commentid = value.split("-")[1];

        if (userid > 0) {
            var modal = $find("lbtRecomment");
            modal.show();
        }
        else {
            var modal = $find("lbtLogin");
            modal.show();
        }
    });

    //Liên hệ đến chủ cửa hàng
    $('.gotoPostContactShop').click(function () {

        var flag = true;
        var str = "";

        if ($(".contactshop-content").val() == '') {
            flag = false;
            str = "Nội dung không được bỏ trống!";
        }

        if (!flag) {
            $(".shop-error").html(str);
            return false;
        }
        else {
            $(".shopuseraction").val('processContactShop');
            document.forms[0].submit();
        }

    });

    $('.gotoContactShop').click(function () {
        if (userid > 0) {
            var modal = $find("lbtContactShop");
            modal.show();
        }
        else {
            var modal = $find("lbtLogin");
            modal.show();
        }
    });

    //Cảnh báo vi phạm
    $('.gotoPostReportPro').click(function () {

        $(".shopuseraction").val('processReportPro');
        document.forms[0].submit();

    });

    $('.gotoReportPro').click(function () {
        if (userid > 0) {
            var modal = $find("lbtReportPro");
            modal.show();
        }
        else {
            var modal = $find("lbtLogin");
            modal.show();
        }
    });

    //
    $('.gotoLogin').click(function () {
        var flag = true;
        var str = "";

        if ($(".shop-pass").val() == '') {
            flag = false;
            str = "Mật khẩu không được bỏ trống!";
        }

        if ($(".shop-username").val() == '') {
            flag = false;
            str = "Tên đăng nhập không được bỏ trống!";
        }

        if (!flag) {
            $(".shop-error").html(str);
            return false;
        }
        else {
            $(".shopuseraction").val('processLogin');
            document.forms[0].submit();
        }

    });
});