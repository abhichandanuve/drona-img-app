from django.db import models

# Create your models here.

class Project(models.Model):

    name = models.CharField(unique=True, max_length=100)
    height = models.CharField(max_length=100)
    def _str_(self):
        return self.name


    
