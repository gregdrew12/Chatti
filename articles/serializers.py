from rest_framework import serializers
from .models import Article, Message, UserArticleRelationship

class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article 
        fields = ('pk', 'url')

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'

class UserArticleRelationshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserArticleRelationship
        fields = '__all__'