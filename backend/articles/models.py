from django.db import models

class Article(models.Model):
    url = models.URLField()
