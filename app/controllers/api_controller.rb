class ApiController < ApplicationController
  def home
    @endpoint = params[:endpoint]
    @method = params[:http]
    @reqd_params = get_reqd_param_names
    @opt_params = get_opt_param_names
     @output = results2
     @r = get_reqd_params_and_values.to_s
     @o = get_opt_params_and_values.to_s
    respond_to do |format|
      format.html
      format.js
    end
  end

  private

  
  def get_reqd_param_names
    @rparams = []
    i = 1
    while !params[:rparams_.to_s + "#{i}"].nil?
      @rparams << params[:rparams_.to_s + "#{i}"]
      i += 1
    end
    @rparams
  end


def get_reqd_params_and_values 
 @values = {}
    i = 1
    while !params[:rparams_.to_s + "#{i}"].nil?	
	value = params[:rparam_values_.to_s + "#{i}"]
      @values[params[:rparams_.to_s + "#{i}"]] = value
      i += 1
    end
    @values
end 

  def get_opt_param_names
    @oparams = []
    i = 1
    while !params[:oparams_.to_s + "#{i}"].nil?
      @oparams << params[:oparams_.to_s + "#{i}"]
      i += 1
    end
    @oparams
  end
  
def get_opt_params_and_values 
 @values = {}
    i = 1
    while !params[:oparams_.to_s + "#{i}"].nil?
	value = params[:oparam_values_.to_s + "#{i}"]
      @values[params[:oparams_.to_s + "#{i}"]] = value
      i += 1
    end
    @values
end 

  def results
    @combinations = []
    @reqd_params = get_reqd_param_names
    @opt_params = get_opt_param_names
    @reqd_param_values = get_reqd_params_and_values
    @opt_param_valaues = get_opt_params_and_values 

    op_count = 	@opt_params.size
    (1..op_count).each do |i|
       comb_arr = @opt_params.combination(i).to_a
         comb_arr.each do |c|
		@combinations << (@reqd_params + c)
	end
    end
    @combinations
  end  

 def results2
    @combinations = []
   @final_list = []
    @reqd_params = get_reqd_param_names
    @opt_params = get_opt_param_names
    @reqd_param_values = get_reqd_params_and_values
    @opt_param_values = get_opt_params_and_values 

    opt_count =  @opt_param_values.size
     arr_values = []  
 @opt_param_values.each do |k, v| 
	v.each do |i|
	 arr_values[v.index(i)] = k.to_s + "=" + v[v.index(i)]
	end	 
	 @combinations.concat(arr_values)
	@combinations = @combinations.uniq{|x| x}
	(1..@combinations.size).each do |c|
		comb_arr = @combinations.combination(c).to_a	
		comb_arr.each do |i|
		logger.info "==========="+i.to_s

		  i = i.uniq
		@final_list << (@reqd_params + i)
		end
	end

	end	
logger.info "==========="+@final_list.size.to_s
@final_list
  end  



end















