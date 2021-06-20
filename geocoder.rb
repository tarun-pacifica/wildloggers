require 'geocoder'
require 'pry-byebug'

location_list = ["Delhi, India", "Gorakhpur, India", "Siliguri, India", "Guwahati, India", "Shillong, India", "Cherrapunji, India", "Tezpur, India", "Dirang, India", "Tawang, India"]

location_list.each_with_index do |location, index|
	results = Geocoder.search location
	puts "{text: 'Day #{index+1}', lat: #{results.first.coordinates[0]}, long: #{results.first.coordinates[1]}}, " 
end