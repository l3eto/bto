/*
 * @Author:Alberto Acuña (Beto)
 * bto v1
 * created: 19/12/16
 */

var bto = function(){

  //SET PROPERTIES
  var properties = {};

  /*
   * PARAMS URL
   * bto.params -> get method 
   */
  var params = {};
  var vars = window.location.search.substring(1).split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    var type = typeof params[pair[0]];
    if (type === "undefined") {params[pair[0]] = decodeURIComponent(pair[1]);}
    else if (type === "string") {var arr = [params[pair[0]],decodeURIComponent(pair[1]) ];params[pair[0]] = arr;}
    else {params[pair[0]].push(decodeURIComponent(pair[1]));}
  }
  properties.params = params;


  


  /*
   * Export Table by Id to Excel
   * bto.exportToExcel('tableId', 'W3C Example Table');
   */
  var exportExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
      window.location.href = uri + base64(format(template, ctx))
    }
  })();
  properties.exportToExcel = exportExcel;
  
  
  
  
  
  /*
   * Detect Navigator and Version
   * bto.navigator.name='chrome' - bto.navigator.version='50';
   */
  navigator.getnameversion= (function(){
    var app ={};
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    if(M.length>0){app = {'name':M[0],'version':M[1]};};
    return app;
  })();
  properties.navigator = navigator.getnameversion;

  
  return properties;
}();
