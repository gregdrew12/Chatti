from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.utils import timezone

from .models import Article, UserArticleRelationship
from .serializers import *

@api_view(['GET', 'POST'])
def articles_list(request):
    if request.method == 'GET':
        data = Article.objects.filter(url=request.GET.get('url', ''))

        serializer = ArticleSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def message_list(request):
    if request.method == 'GET':
        data = Message.objects.filter(article_id=request.GET.get('article', ''))

        serializer = MessageSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def viewed_articles(request):
    if request.method == 'GET':
        user = request.GET.get('user', '')
        data = UserArticleRelationship.objects.filter(user=user).order_by('-last_viewed')

        serializer = UserArticleRelationshipSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UserArticleRelationshipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def viewed_articles_detail(request, pk):
    if request.method == 'PUT':
        try:
            uar = UserArticleRelationship.objects.get(pk=pk)
            uar.last_viewed = timezone.now()
            uar.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except UserArticleRelationship.DoesNotExist:
            return Response({'error': 'The specified model does not exist.'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        