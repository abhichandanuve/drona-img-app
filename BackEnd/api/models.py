from django.db import models

# Create your models here.

class Project(models.Model):
    
    name = models.CharField(unique=True, max_length=100)
    height = models.CharField(null = True, max_length=100)
    width= models.CharField(null = True, max_length=100)
    make= models.CharField(null = True, max_length=100)
    model= models.CharField(null = True, max_length=100)
    dateTime= models.CharField(null = True, max_length=100)
    speed= models.CharField(null = True, max_length=100)
    lat= models.CharField(null = True, max_length=100)
    lng= models.CharField(null = True, max_length=100)
    isFlagged= models.CharField(null = True, max_length=100)

    def _str_(self):
        return self.name


    
