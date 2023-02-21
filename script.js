import orderdata  from "./json/data.js";
$(document).ready(function () {
            // console.log("Hello world")
            // var url = "data.json"
            // console.log("Hello world")
            // $("#orderTable").DataTable({
            //         "ajax": {
            //             url: "data.js",

            //             dataSrc: ""
            //         },
            //         "columns": [
            //             { data: "Order Id"},
            //             { data: "Item name"},
            //             { data: "Quantities"},
            //             { data: "Price"}
            //         ]
            // })
            let cols = []
            console.log(orderdata[0]);
            var keys = Object.keys(orderdata[0]);

            //for each key, add a column definition
            keys.forEach(function (k) {
                cols.push({
                    title: k,
                    data: k
                });
            });
            console.log(cols)
            let datatable = $("#orderTable").DataTable({
                columns: cols
            });
            let index_table = JSON.parse(localStorage.getItem('newOrder'))
            console.log(index_table)
            datatable.rows.add(index_table).draw();
            
            $('#loginButton').click(function(){
                if('code' in localStorage){
                    $('#loginButton').attr('href', 'admin.html')
                }
                else{
                    $('#loginButton').attr('href', 'login.html')
                }
            })
        })