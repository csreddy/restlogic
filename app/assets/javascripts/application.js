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
	   
	 $("#rpm_"+parent).after("<div id='rpm_"+ child +"' class='rparam'></div>");
	 
	 $("#rpm_"+child).append("<input type='text' id='rparams_"+child+"' name='rparams_"+child+"' > ")
	  
	 $("#rpm_"+child).append("<select multiple='multiple' id='rparam_values_" + child +"'  name='rparam_values_" + child +"[]'><option value=''></option></select> ").append(" ");

	  $("#rpm_"+child).append("<input type='text' class='value_text_field' id='add_rparam_value_field_"+ child +"' > ");	 	 
	
	  $("#rpm_"+child).append("<button type='button' class='add_value_btn'  id='add_rparam_value_btn_" + child + "' >Add Value</button>");	 
	  
  };
  
  function addOptionalParam() {
   count = $('input[id*="oparams_"]').length ;
   parent = count;
   child = parent + 1
	   
 $("#opm_"+parent).after("<div id='opm_"+ child +"' class='oparam'></div>");
	 
 $("#opm_"+child).append("<input type='text' id='oparams_"+child+"' name='oparams_"+child+"' > ")
	  
 $("#opm_"+child).append("<select multiple='multiple' id='oparam_values_" + child +"'  name='oparam_values_" + child +"[]'><option value=''></option></select>").append(" ");

  $("#opm_"+child).append("<input type='text' class='value_text_field' id='add_oparam_value_field_"+ child +"' > ");	 	 
	
  $("#opm_"+child).append("<button type='button' class='add_value_btn'  id='add_oparam_value_btn_" + child + "'>Add Value</button>");	 
  };
 

  function addHeader() {
   count = $('select[id*="header_type_"]').length ;
   parent = count;
   child = parent + 1
	   
 $("#header_"+parent).after("<div id='header_"+ child +"' class='header'></div>");
	 
 $("#header_"+child).append("<select type='text' id='header_type_"+child+"' name='header[type_"+child+"]' > </select>");
 $("#header_type_" + child).append("<option value='accept' >accept</option>").append("<option value='content-type' >content-type</option>").append("<option value='location' >location</option>");
	  
 $("#header_"+child).append("<select multiple='multiple' id='header_values_" + child +"'  name='header_values_" + child +"[]'><option value=''></option></select>").append(" ");

  $("#header_"+child).append("<input type='text' name='header_value_"+ child +"' class='header_value_text_field' id='header_value_"+ child +"' > ");	 	 
	
  $("#header_"+child).append("<button type='button' class='add_header_value_btn'  id='add_header_value_btn_" + child + "'>Add Value</button>");	 
  };


$(".container").on("click", ".add_value_btn", function(event){
  event.preventDefault();
  var parent = $(this).parent();
  var newValue = $(parent).find('.value_text_field').val();
  var values = $(parent).find('select');
if(newValue.length !=0){
	$(values).append("<option value='"+ newValue +"' >"+ newValue +"</option>");
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
	$(values).append("<option value='"+ newValue +"' >"+ newValue +"</option>");
      $(parent).children('select').eq(1).find('option').prop('selected', 'selected');
       $(parent).find('.header_value_text_field').val("");
}  
});


 
 
