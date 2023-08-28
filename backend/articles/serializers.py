from rest_framework import serializers
from .models import Article, Message

class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article 
        fields = ('pk', 'url')

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'