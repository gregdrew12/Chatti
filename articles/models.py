from django.db import models

class Article(models.Model):
    url = models.URLField()

class Message(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField()
    sender = models.CharField(max_length=50)
    sent_at = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = []
