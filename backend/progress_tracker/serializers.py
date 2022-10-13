from rest_framework import serializers
from .models import ProgressTracker




class ProgressTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressTracker
        fields = ['id', 'focus_area', 'measurement_of_progress']
        depth = 1