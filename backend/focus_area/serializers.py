from rest_framework import serializers
from .models import FocusArea




class FocusAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FocusArea
        fields = ['id', 'user', 'focus_area', 'task', 'time_of_task', 'day_of_week', 'notes', 'completed']
        depth = 1