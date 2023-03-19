from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class Bet(models.Model):
    bet_amount = models.DecimalField(max_digits=10, decimal_places=2)
    bet_type = models.CharField(max_length=50)
    placed_at = models.DateTimeField(auto_now_add=True)

