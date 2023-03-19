from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from store.models import Bet

# Create your views here.

def home(request):
    return render(request, 'store/index.html')

@csrf_exempt
def betplace(request):
    if request.method == 'POST':
        bet_amount = request.POST.get('bet_amount')
        bet_type = request.POST.get('bet_type')

        # Insert the data into the database
        Bet.objects.create(bet_amount=bet_amount, bet_type=bet_type)

        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error'})

def contact(request):
     return render(request, 'contact.html')

def user_bets(request):
    user = request.user
    bets = Bet.objects.filter(user=user)
    return render(request, 'bets.html', {'bets': bets})