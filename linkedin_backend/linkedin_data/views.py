from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .linkedin_computing import GenerateData

import json
import traceback

def index(request):
  return HttpResponse("Hello, world. You're at the polls index.")

@csrf_exempt
def retrieve_json_and_get_data(request):
    if request.method == 'POST':
        try:
            linkedin_data = GenerateData()
            
            dataRecieved = request.body
            dataRecieved = json.loads(dataRecieved.decode()) 
            #dict_obj = pickle.loads(dataRecieved)
            #print(type(dataRecieved[0]))
            print(dataRecieved[0],dataRecieved[1])
            dataRecieved = ["2025-09-27" , "2026-02-19"]
            jsonData = linkedin_data.main_function(dataRecieved[0],dataRecieved[1])            
            
            json_str = json.dumps(jsonData, indent=4,ensure_ascii=False)
            if len(str(json_str)) < 5:
                return JsonResponse({"jsonData": "", 'message': 'Not enough data on the given date'},status =400)
            print("ici")
            return JsonResponse({"jsonData": jsonData, 'message': 'Data processed well'},status =200)
        except Exception as e:
            print("Error:")
            traceback.print_exc()
            return JsonResponse({'error': f'JSON Error. {traceback.print_exc()}'}, status=500)
    else:
        print("popo")
        traceback.print_exc()
        print("dodo")
        return JsonResponse({'error': 'JSON error.'}, status=400)

@csrf_exempt
def retrieve_min_and_max_application_date(request):
    print("Inside the root")
    if request.method == 'GET':
        try:
            linkedin_data = GenerateData()
            min_date , max_date = linkedin_data.min_and_max_date_of_applicaton()
            json_str = {
                "min":f"{min_date.split("-")[2]}-{min_date.split("-")[1]}-{min_date.split("-")[0]}",
                "max":f"{max_date.split("-")[2]}-{max_date.split("-")[1]}-{max_date.split("-")[0]}"
            }
            return JsonResponse({"jsonData": json_str, 'message': 'Min and Max application date recieved well'},status =200)    
            
        except:
            traceback.print_exc()
            return JsonResponse({'error':'Date retrieving error'} , status=400)