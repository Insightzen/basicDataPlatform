$(document).ready(function() {
    hospitalSearchByName();
});

function  hospitalSearchByName(){
// layui方法
    layui.use(['table', 'form', 'layer'], function () {

        // 操作对象
        var form = layui.form
            , table = layui.table
            , layer = layui.layer
            , $ = layui.jquery;

        var name=$("#hospitalNameId").val().trim();
        $.ajax({
            url:"http://52.82.2.180:18081/api/v1/hospital/search",
            data:JSON.stringify({
                "name": name,
            }),
            type:'post',
            ContentType:"application/json",
            dataType:'json',
            success:function(data){
                // 表格渲染
                var tableIns = table.render({
                    elem: '#dateTable-hospital'                  //指定原始表格元素选择器（推荐id选择器）
                    // , height: vipTable.getFullHeight()    //容器高度
                    , cols: [[                  //标题栏
                        {field: 'hospital_name', title: '医院名称', width: 250}
                        , {field: 'hospital_grade', title: '医院等级', width: 150}
                        , {field: 'province_code', title: '省份', width: 150}
                        , {field: 'city_code', title: '市', width: 200}
                        , {field: 'area_district', title: '区', width: 100}
                        , {field: 'address', title: '地址', width: 100}
                    ]]
                    ,data:data.data
                    , page: false
                    // , limits: [30, 60, 90, 150, 300]
                    , limit: 20 //默认采用30
                    , loading: false
                    , done: function (res, curr, count) {
                        //如果是异步请求数据方式，res即为你接口返回的信息。
                        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                        console.log(res);

                        //得到当前页码
                        console.log(curr);

                        //得到数据总量
                        console.log(count);
                    }
                });

            },
            error: function (error) {
                console.log(err);
            },
            complete: function () {

            }
        });
        // you code ...

    });
}


function ChangeColor (val) {
    let tags = "医院";
    if (tags !== null && tags !== '') {
        let reg = new RegExp("(" + tags + ")", "g");
        if (val !== null && val !== '') {
            return val.replace(reg, "<font style='color:red'>$1</font>");
        } else {
            return val
        }
    } else {
        return val
    }

}