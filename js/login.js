//获取指定form中的所有的<input>对象
function getElements(formId) {
    var form = document.getElementById(formId);
    var elements = new Array();
    var tagElements = form.getElementsByTagName('input');
    for (var j = 0; j < tagElements.length; j++){
        elements.push(tagElements[j]);
    }
    return elements;
}

layui.use(['form'], function () {
    // 操作对象
    var form = layui.form
        , $ = layui.jquery;
    // you code ...

    var myform=getElements("loginform");
    var name= myform[0].value;
    $("#loginId").click(function () {
        window.location.href="../index.html";
    });
});

function login() {
    var myform=getElements("loginform");
    var loginName= myform[0].value;
    var password= myform[1].value;
    sessionStorage.setItem("loginName", loginName);

    var data=JSON.stringify({username: loginName, password:password});

    $.ajax({
        url:"http://52.82.2.180:18081/api/v1/login",
        type:'post',
        dataType:'json',
        data:data,
        contentType: "application/json; charset=utf-8",
        success: function (data, status) {
            window.location.href="index.html";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
           layer.msg("登录失败");
        },
    });
}
