class ApiController < ApplicationController

 # returns combiations result 
  def home
    @endpoint = params[:endpoint]
    @method = params[:http]
    @reqd_params = get_reqd_param_names
    @opt_params = get_opt_param_names
    @o = get_opt_params_and_values
    @h = header_array  # @h = get_headers
    @r_output = reqd_params_only_result
    @o_output = opt_params_only_result
    @r = get_reqd_params_and_values    
    @reqd_and_opt_results = reqd_and_opt_params_combination_results
 #   logger.info " reqd_and_opt_results  = "+ @reqd_and_opt_results.to_s
    respond_to do |format|
      format.html
      format.js
    end
  end

# returns tests results
def tests
  @endpoint = params[:endpoint]
  @method = params[:http]
  @reqd_params = get_reqd_param_names
  @opt_params = get_opt_param_names
  @r = get_reqd_params_and_values
  @o = get_opt_params_and_values
  @header_fields = get_headers
  @h = header_array
  @r_output = reqd_params_only_result
  @o_output = opt_params_only_result
  @reqd_and_opt_results = reqd_and_opt_params_combination_results 
respond_to do |format|
      format.html
      format.js
    end
end


  private

  # returns an array all reqd parameter names
  def get_reqd_param_names
    rparams = []
    i = 1
    while !params[:rparams_.to_s + "#{i}"].nil?
      rparams << params[:rparams_.to_s + "#{i}"]
      i += 1
    end
    rparams
  end

# returns a hash of required param and their values
def get_reqd_params_and_values 
#  logger.info "get_reqd_params_and_values----------------------"
 values = {}
    i = 1
    while !params[:rparams_.to_s + "#{i}"].nil?
      if(!params[:rparams_.to_s + "#{i}"].empty?)
      value = params[:rparam_values_.to_s + "#{i}"]
   #   logger.info "--------------"+params[:rparam_values_.to_s + "#{i}"].to_s
      values[params[:rparams_.to_s + "#{i}"]] = value     
    end 
      i += 1
    end
    # logger.info "--------------"+values.to_s
    values
end 

# returns an array of optional param names
  def get_opt_param_names
    oparams = []
    i = 1
    while !params[:oparams_.to_s + "#{i}"].nil?
      oparams << params[:oparams_.to_s + "#{i}"]
      i += 1
    end
    oparams
  end

# returns a hash of optional param & their values
def get_opt_params_and_values 
 values = {}
    i = 1
    while !params[:oparams_.to_s + "#{i}"].nil?
	    if(!params[:oparams_.to_s + "#{i}"].empty?)
      value = params[:oparam_values_.to_s + "#{i}"]
      values[params[:oparams_.to_s + "#{i}"]] = value
    end
      i += 1
    end
    values
end 

 #def results
 #  combinations = []
 #
 #  op_count = 	 @opt_params.size
 #  (1..op_count).each do |i|
 #     comb_arr = @opt_params.combination(i).to_a
 #       comb_arr.each do |c|
 #	combinations << (@reqd_params + c)
 #end
 #  end
 #  combinations
 #end  
 
# returns a hash of reqd+optional parameter values combinations
  def reqd_and_opt_params_combination_results
    if @r_output.empty?
      @o_output
    elsif @o_output.empty?
      @r_output
    else
        @r_output.product(@o_output)  if !(@r_output.empty? && @o_output.empty?)  
    end  
  end


# returns an array of required param values combinations
 def reqd_params_only_result
    combinations = []
    reqd_params = get_reqd_params_and_values
   # logger.info "==============="+reqd_params.to_s
     reqd_params.each do |k, v|
       if(!v.nil? || k.empty?) 
         v.each do |i|
         v[v.index(i)] = k.to_s + "=" + v[v.index(i)]
       end
       end        
       combinations << v
     end
    #  @combinations = @combinations.first.product(*@combinations[1..-1]).map(&:join)
     variations(combinations) unless !combinations
end


# def opt_params_only_result
#    combinations = []
#   opt_params = get_opt_params_and_values
#     logger.info "--------------------------"+opt_params.to_s
#     opt_params.each do |k, v|
#       v.each do |i|
#         v[v.index(i)] = k.to_s + "=" + v[v.index(i)]
#       end
#       combinations << v
#     end
#    #  @combinations = @combinations.first.product(*@combinations[1..-1]).map(&:join)
#    variations(combinations) unless !combinations
#     
#end
#

# returns on array combinations of values
def variations(a)
  if !a.empty?
    first = a.first 
    if a.length==1 then
      first
    else
      rest = variations(a[1..-1])
      first.map{ |x| rest.map{ |y| "#{x} #{y}" } }.flatten
    end
  else
    # "array is empty"
    a
  end
  
end

#returns ar array of optional param values combinations
def opt_params_only_result
  combinations = []
  final_list = []
  final_comb = []
  opt_param_values = get_opt_params_and_values 
  opt_params = get_opt_param_names
 
    opt_param_values.each do |k, v|
      v.each do |i|
         v[v.index(i)] = k.to_s + "=" + v[v.index(i)]
      end
      combinations << v
    end

(1..combinations.size).each do |c|
  logger.info c.to_s
  final_list << combinations[c-1].combination(1).to_a
  arr = []
end

 # final_list << combinations.each_index.flat_map{|i| combinations[0].product(*combinations[1..i])}
  final_list << progressive_product(combinations)
   final_list.each_index {|i| final_list[i].each {|k| final_comb << final_list[i][final_list[i].index(k)] }}
   final_comb.flatten(1)

end


# performs progessive product on array of arrays
def progressive_product(arrs)
  x, *xs = arrs
  (1..xs.count).map(&xs.method(:take)).map do |args|
    x.product(*args)
  end
end


# returns a hash of header fields and its values
def get_headers
header_values = {}
    i = 1
  #  while !params[:header][:type_.to_s + "#{i}"].nil?
      while !params[:header_values_.to_s + "#{i}"].nil?
	    value = params[:header_values_.to_s + "#{i}"]
    	header_values[params[:header][:type_.to_s + "#{i}"]] = value
      i += 1
    end
    header_values
end

# returns an array of headers
def header_array
  hash = get_headers 
  arr = []
  hash.each do |k, v|
	v.each do |i|
	arr << k + "=" + i
	end
end
  arr
end

end



