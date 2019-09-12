$(document).ready(function() {
    serviceSearchByName();
});

function  serviceSearchByName(){
// layui方法
    layui.use(['table', 'form', 'layer'], function () {

        // 操作对象
        var form = layui.form
            , table = layui.table
            , layer = layui.layer
            , $ = layui.jquery;

        var name=$("#projectCodeId").val().trim();

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
                    elem: '#dateTable'                  //指定原始表格元素选择器（推荐id选择器）
                    // , height: vipTable.getFullHeight()    //容器高度
                    , cols: [[                  //标题栏
                        {field: 'hospital_name', title: '通用名称', width: 250}
                        , {field: 'general_product_name', title: '商品名', width: 150}
                        , {field: 'english_name', title: '英文名', width: 150}
                        , {field: 'formula', title: '剂型', width: 200}
                        , {field: 'specification', title: '规格包装', width: 100}
                        , {field: 'manufacturing_unit', title: '生产厂家', width: 100}
                        , {field: 'product_type', title: '分类', width: 200}
                        , {field: 'drug_standard_number', title: '本位码', width: 100}
                        , {field: 'approval_number', title: '国药准字', width: 100}
                    ]]
                    , id: 'dataCheck'
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