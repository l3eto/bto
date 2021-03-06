/*
 * @Author:Alberto Acuña (Beto)
 * bto v1
 * created: 19/12/16
 */

//SET CLASS NAME
var bto = function(){	
  var main = {};

  //SET PROPERTIES
  var properties = {};
  //SET METHODS
  var methods = {};


  /*
   * Requires Utils.js
   * Set all elements with id as variable name
   * bto.id["nameId"] or bto.id.nameId
   */
  var els = {};
  document.querySelectorAll('[id]:not([id=""])').forEach(function(el){els[el.id]=el;});
  properties.id = els;


  /*
   * Requires Utils.js
   * Set all elements with class as variable name
   * bto.id["nameClass"] or bto.id.nameClass
   */
  var els = {};
  document.querySelectorAll('[class]:not([class=""])').forEach(function(el){els[el.id]=el;});
  properties.class = els;


  /*
   * Params from url
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
   * Detect Navigator and Version
   * bto.navigator.name='chrome' - bto.navigator.version='50';
   */
  navigator.getnameversion= (function(){
    var app={};
    var mobile=false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) mobile = true;
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
    if(M.length>0){app = {'name':M[0],'version':M[1],'mobile':mobile};};
    return app;
  })();
  properties.navigator = navigator.getnameversion;

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
  methods.exportToExcel = exportExcel;

  /*
   * Find elements
   * bto.querySel('#id');
   */
  var querySel = (function() {
    return function(queryStr){
      var selector = document.querySelectorAll(queryStr);
      return (selector.length>0 ? (selector.length>1 ? selector : selector[0] ) : null );
    }
  })();
  methods.find = querySel;


  /*
   * Check if empty
   * bto.isEmpty("text value example) -> false
   */
  var checkEmpty = (function(obj) {
    for(var key in obj) {if(obj.hasOwnProperty(key)){return false;}}
    return true;
  })();
  methods.isEmpty = checkEmpty;
  
  
  /*
   * On load element event
   * bto.onLoadElement("#elementId",fn) -> var fn = function(elementLoaded){console.log(elementLoaded);}
   */
  var onLoadElement = function(queryStr,callback) {
      if (typeof queryStr==="string" && typeof callback==="function") {
	  var seconds = 0;
	  var intTab = setInterval(function(){checkEl();},1);
	  var checkEl = function () {
	      seconds++;
	      var el = document.find(queryStr);
	      if(el!=null && el.length!=0) {
  	          clearInterval(intTab);
  	          console.log("founded element after "+seconds/1000+" seconds: ");
  	          callback(el);
  	      }
  	  }
      } else {
          console.log("Error: wrong type of args");
	  return null;
      }
  }
  methods.isLoaded = onLoadElement;


  //CALL PROPERTIES USING 'pr'
  main.pr = properties;
  //CALL FUNCTIONS USING 'fn'
  main.fn = methods;
	
  console.log('bto framework loaded ...');
	console.log($);
	
  //RETURN FUNCTIONS AND PROPERTIES
  return main;
}();
