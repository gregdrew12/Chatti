# Generated by Django 4.2.4 on 2023-09-15 00:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_userarticlerelationship'),
    ]

    operations = [
        migrations.AddField(
            model_name='userarticlerelationship',
            name='url',
            field=models.URLField(default='null'),
        ),
    ]