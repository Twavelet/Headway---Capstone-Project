from email.policy import default
from unittest.util import _MAX_LENGTH
from django.db import models
from authentication.models import User
# Create your models here.

class FocusArea(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    focus_area = models.CharField(max_length = 150)
    task = models.CharField(max_length = 150)
    time_of_task = models.TimeField()
    day_of_week = models.DateField()
    notes = models.CharField(max_length = 500, blank = True)
    completed = models.BooleanField(default = False, blank = False )
    color = models.CharField(max_length = 50, default = 'red')