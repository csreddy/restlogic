// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .

  
  function addReqdParam() {
	   count = $('input[id*="rparams_"]').length ;
	   parent = count;
	   child = parent + 1
	   
	 $("#rpm_"+parent).after("<div id='rpm_"+ child +"' class='rparam'></div>").append("<br/>");
	 
	 $("#rpm_"+child).append("<input type='text' placeholder='Required Parameter' id='rparams_"+child+"' name='rparams_"+child+"' > ")
	  
	 $("#rpm_"+child).append("<select multiple='multiple' id='rparam_values_" + child +"'  name='rparam_values_" + child +"[]'><option value=''></option></select> ").append(" ");

	  $("#rpm_"+child).append("<input type='text' class='value_text_field' placeholder='Enter Value' id='add_rparam_value_field_"+ child +"' > ");	 	 
	
	  $("#rpm_"+child).append("<button type='button' class='add_value_btn'  id='add_rparam_value_btn_" + child + "' >Add</button>");	 
	  
  };
  
  function addOptionalParam() {
   count = $('input[id*="oparams_"]').length ;
   parent = count;
   child = parent + 1
	   
 $("#opm_"+parent).after("<div id='opm_"+ child +"' class='oparam'></div>").append("<br/>");
	 
 $("#opm_"+child).append("<input type='text' placeholder='Optional Parameter' id='oparams_"+child+"' name='oparams_"+child+"' > ")
	  
 $("#opm_"+child).append("<select multiple='multiple' id='oparam_values_" + child +"'  name='oparam_values_" + child +"[]'><option value=''></option></select>").append(" ");

  $("#opm_"+child).append("<input type='text' class='value_text_field' placeholder='Enter Value' id='add_oparam_value_field_"+ child +"' > ");	 	 
	
  $("#opm_"+child).append("<button type='button' class='add_value_btn'  id='add_oparam_value_btn_" + child + "'>Add</button>");	 
  };
 

  function addHeader() {
   count = $('select[id*="header_type_"]').length ;
   parent = count;
   child = parent + 1
	   
 $("#header_"+parent).after("<div id='header_"+ child +"' class='header'></div>").append("<br/>");
	 
 $("#header_"+child).append("<select type='text' id='header_type_"+child+"' name='header[type_"+child+"]' > </select>").append(" ");

  headers = ["accept", "accept-charset", "accept-encoding", "accept-language", "cache-control", "connection", "content-length", "content-type", "date", "expires", "location", "referer", "server", "user-agent"];
 for (i=0;i<headers.length;i++){
 $("#header_type_" + child).append("<option value='"+ headers[i] +"' >"+ headers[i] +"</option>");
 } 
	  
 $("#header_"+child).append("<select multiple='multiple' id='header_values_" + child +"'  name='header_values_" + child +"[]'><option value=''></option></select>").append(" ");

  $("#header_"+child).append("<input type='text' placeholder='Enter Value' name='header_value_"+ child +"' class='header_value_text_field' id='header_value_"+ child +"' > ");	 	 
	
  $("#header_"+child).append("<button type='button' class='add_header_value_btn'  id='add_header_value_btn_" + child + "'>Add</button>").append("<br/>");	 
  };


$(".container").on("click", ".add_value_btn", function(event){
  event.preventDefault();
  var parent = $(this).parent();
  var newValue = $(parent).find('.value_text_field').val();
  var values = $(parent).find('select');
if(newValue.length !=0){
	$(values).append("<option value='"+ escape(newValue) +"' >"+ newValue +"</option>");
      $(parent).find('select option').prop('selected', 'selected');
       $(parent).find('.value_text_field').val("");
} 
});

$(".container").on("click", ".add_header_value_btn", function(event){
  event.preventDefault();
  var parent = $(this).parent();
  var newValue = $(parent).find('.header_value_text_field').val();
  var values = $(parent).children('select').eq(1);
if(newValue.length !=0){
	$(values).append("<option value='"+ escape(newValue) +"' >"+ newValue +"</option>");
      $(parent).children('select').eq(1).find('option').prop('selected', 'selected');
       $(parent).find('.header_value_text_field').val("");
}
});

function form_action(action){
	switch(action){
		case 'home':
			$('#api_form').attr("action", "/api/home");
			break;
		case 'tests':
			$('#api_form').attr("action", "/api/tests");
		//	$('#api_form').attr("data-remote", "false");
	}
	$('#api_form').submit();
	
	$(document).ajaxStop(function(r, s) {
		if($("#results").text() != ""){
		$('#copy').attr("style", "visibility: visible;"); 
		}
	});
};

function SelectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

 SelectText('results');
 
 // load example1 endpoint params
 function example1(){
	 formReset();
	
	 $("#http_method").val("GET");
	 $("#endpoint").val("http://localhost:8003/v1/search/");
	 
	 // optional params
	 $("#oparams_1").val("q");
	 $("#oparam_values_1").append("<option value='james'>james</option>");
	 $("#oparam_values_1").append("<option value='%$*#'>%$*#</option>");
	 $("#oparam_values_1").find('option').prop('selected', 'selected');
	 $("#add_oparam").click();
	 $("#oparams_2").val("start");
	 $("#oparam_values_2").append("<option value='1'>1</option>");
	 $("#oparam_values_2").append("<option value='-10'>-10</option>");
	 $("#oparam_values_2").find('option').prop('selected', 'selected');
	 $("#add_oparam").click();
	 $("#oparams_3").val("pageLength");
	 $("#oparam_values_3").append("<option value='20'>20</option>");
	 $("#oparam_values_3").append("<option value='abc'>abc</option>");
	 $("#oparam_values_3").find('option').prop('selected', 'selected');
	 $("#add_oparam").click();
	 $("#oparams_4").val("format");
	 $("#oparam_values_4").append("<option value='xml'>xml</option>");
	 $("#oparam_values_4").append("<option value='json'>json</option>");
	 $("#oparam_values_4").append("<option value='text'>text</option>");
	 $("#oparam_values_4").find('option').prop('selected', 'selected');
	 
	 // headers
	 $("#header_type_1").val("content-type");
	 $("#header_values_1").append("<option value='application/xml'>application/xml</option>");
	 $("#header_values_1").append("<option value='application/text'>application/json</option>");
	 $("#header_values_1").find('option').prop('selected', 'selected');
	
 }
 
 
 function example2(){
	 formReset();
	 $("#http_method").val("POST");
	 $("#endpoint").val("http://localhost:8003/v1/example/");
	 // reqd params
	 $("#rparams_1").val("Reqd1");
	 $("#rparam_values_1").append("<option value='value1' >Value1</option>");
	 $("#rparam_values_1").append("<option value='value2' >Value2</option>");
	 $("#rparam_values_1").find('option').prop('selected', 'selected');
	 $("#add_rparam").click();
	 $("#rparams_2").val("Reqd2");
	 $("#rparam_values_2").append("<option value='somevalue1' >somevalue1</option>");
	 $("#rparam_values_2").append("<option value='somevalue2' >somevalue2</option>");
	 $("#rparam_values_2").find('option').prop('selected', 'selected');
	 
	 // optional params
	 $("#oparams_1").val("Option1");
	 $("#oparam_values_1").append("<option value='value1'>value1</option>");
	 $("#oparam_values_1").append("<option value='%$*#'>%$*#</option>");
	 $("#oparam_values_1").find('option').prop('selected', 'selected');
	 $("#add_oparam").click();
	 $("#oparams_2").val("Option2");
	 $("#oparam_values_2").append("<option value='badvalue1'>badvalue1</option>");
	 $("#oparam_values_2").append("<option value='1000'>1000</option>");
	 $("#oparam_values_2").find('option').prop('selected', 'selected');
	
	 // headers
	 $("#header_type_1").val("accept");
	 $("#header_values_1").append("<option value='application/xml'>application/xml</option>");
	 $("#header_values_1").append("<option value='application/text'>application/json</option>");
	 $("#header_values_1").find('option').prop('selected', 'selected');
 }
 
 function formReset(){
 	$('input[type=text]').val("");
	$('select').val("");
	rparamDivCount = $('.rparam').length;
	oparamDivCount = $('.oparam').length;
	headerDivCount = $('.header').length;
	while(rparamDivCount != 1){
		$('.rparam')[1].remove();
		rparamDivCount = $('.rparam').length;
	}
		while(oparamDivCount != 1){
		$('.oparam')[1].remove();
		oparamDivCount = $('.oparam').length;
	}
		while(headerDivCount != 1){
		$('.header')[1].remove();
		headerDivCount = $('.header').length;
	}

	$('select[id*="rparam_values_"] option').remove();
        $('select[id*="oparam_values_"] option').remove();
        $('select[id*="header_values_"] option').remove();
  
        $('select[id*="rparam_values_"]').append("<option value></option>");
        $('select[id*="oparam_values_"]').append("<option value></option>");
        $('select[id*="header_values_"]').append("<option value></option>");
  	$("#header_type_1").val("accept");
  	$("#results").html("");
        $("#copy").hide();


 }
 
 
// $(document).ajaxSend(function(r, s) {
//     $("#wait").show();
//     $('#myModal').modal('show');
// 
// 	});
//
// $(document).ajaxStop(function(r, s) {
//     $("#wait").fadeOut("fast");
//    $('#myModal').modal('hide');
// });
