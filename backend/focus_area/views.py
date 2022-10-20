from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

from .models import FocusArea
from .serializers import FocusAreaSerializer

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_all_focus_areas(request):
#     focus_areas = FocusArea.objects.all()
#     serializer = FocusAreaSerializer(focus_areas, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_focus_area(request):
    if request.method == 'GET':
        focus_areas = FocusArea.objects.filter(user_id=request.user.id)
        serializer = FocusAreaSerializer(focus_areas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_user_focus_area(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = FocusAreaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def edit_user_focus_area(request, pk):
    focus_area = get_object_or_404(FocusArea, pk=pk)
    if request.method == 'PUT':
        serializer = FocusAreaSerializer(focus_area, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = FocusAreaSerializer(focus_area, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_focus_area(request, pk):
    focus_area = get_object_or_404(FocusArea, pk=pk)
    if request.method == 'DELETE':
        focus_area.delete()
        return Response(status.HTTP_204_NO_CONTENT)
