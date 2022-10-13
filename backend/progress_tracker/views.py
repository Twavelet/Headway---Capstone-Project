from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

from .models import ProgressTracker
from .serializers import ProgressTrackerSerializer

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_progress(request):
    if request.method == 'GET':
        progress_tracker = ProgressTracker.objects.filter(focus_area_id=request.user.id)
        # either (focus_area_id=request.id) OR (focus_area_id=request.user.id)
        serializer = ProgressTrackerSerializer(progress_tracker, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_user_progress(request):
    if request.method == 'POST':
        serializer = ProgressTrackerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_user_progress(request, pk):
    progress = get_object_or_404(ProgressTracker, pk=pk)
    if request.method == 'PUT':
        serializer = ProgressTrackerSerializer(progress, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_progress(request, pk):
    progress = get_object_or_404(ProgressTracker, pk=pk)
    if request.method == 'DELETE':
        progress.delete()
        return Response(status.HTTP_204_NO_CONTENT)