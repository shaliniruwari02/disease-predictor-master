from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import joblib
import json

kidney_model=joblib.load(r'G:\disease_predictor\model_API\kidney\kidney_model.pkl')
diabetes_model=joblib.load(r'G:\disease_predictor\model_API\Diabetes\diabetes_model.pkl')
heart_model=joblib.load(r'G:\disease_predictor\model_API\heart\heart_model.pkl')
liver_model=joblib.load(r'G:\disease_predictor\model_API\liver\liver_model.pkl')
breast_cancer_model=joblib.load(r'G:\disease_predictor\model_API\breast cancer\cancer_model.pkl')

# Create your views here.
def index(request):
    return render(request, "predictor/index.html")

@require_http_methods(['POST','PUT'])
@csrf_exempt
def predict(request):
    body=json.loads(request.body)
    disease=body['disease']
    if disease=='kidney':
        bp=body['bp']
        sg=body['sg']
        alb=body['alb']
        bs=body['bs']
        rbc=body['rbc']
        pcc=body['pcc']
        pccc=body['pccs']
        arr=np.array([[bp,sg,alb,bs,rbc,pcc,pccc]])
        pred=kidney_model.predict(arr)
        output=int(pred[0])
        return JsonResponse({"output":output})
    elif disease=='diabetes':
        bp=body['bp']
        pregnancy=body['pregnancy']
        glucose=body['glucose']
        bmi=body['bmi']
        dp_fxn=body['dp_fx']
        age=body['age']
        arr=np.array([[pregnancy,glucose,bp,bmi,dp_fxn,age]])
        pred=diabetes_model.predict(arr)
        output=int(pred[0])
        return JsonResponse({"output":output})
    else:
        return JsonResponse({"output":"Not implemented yet"})