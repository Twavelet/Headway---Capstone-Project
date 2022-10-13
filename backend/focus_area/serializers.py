from rest_framework import serializers
from .models import FocusArea




class FocusAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FocusArea
        fields = ['id', 'user', 'focus_area', 'task', 'time_of_day', 'day_of_week']
        depth = 1