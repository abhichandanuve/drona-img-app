from django.db import models

# Create your models here.

class Project(models.Model):
    
    name = models.CharField(unique=True, max_length=100)
    height = models.BigIntegerField(null=True)
    width= models.BigIntegerField(null = True)
    dateTime= models.CharField(null = True, max_length=1000000)
    speed= models.DecimalField(null = True, max_digits=1000, decimal_places=99)
    lat= models.DecimalField(null = True, max_digits=1000, decimal_places=99)
    lng= models.DecimalField(null = True, max_digits=1000, decimal_places=99)
    isFlagged= models.BooleanField(null = True)

    def _str_(self):
        return self.name


    
