from rest_framework import serializers
from .models import ProgressTracker




class ProgressTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressTracker
        fields = ['id', 'focus_area', 'measurement_of_progress', 'focus_area_id', 'date']
        depth = 1
    focus_area_id = serializers.IntegerField(write_only=True)