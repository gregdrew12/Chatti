# Generated by Django 4.2.4 on 2023-08-28 17:18

from django.db import migrations

def create_data(apps, schema_editor):
    Article = apps.get_model('articles', 'Article')
    Article(url='https://www.washingtonpost.com/sports/2023/08/26/fifa-suspends-luis-rubiales/').save()

class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
