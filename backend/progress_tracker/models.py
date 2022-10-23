from django.db import models
from django.forms import DateField
from focus_area.models import FocusArea
# Create your models here.

class ProgressTracker(models.Model):

    focus_area = models.ForeignKey(FocusArea, on_delete=models.CASCADE)
    measurement_of_progress = models.IntegerField()
    date = models.DateField(default = None)
    depth = 1