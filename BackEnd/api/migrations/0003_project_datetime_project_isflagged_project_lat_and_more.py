# Generated by Django 5.0.4 on 2024-04-07 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_project_height'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='dateTime',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='isFlagged',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='lat',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='lng',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='make',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='model',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='speed',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='width',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
