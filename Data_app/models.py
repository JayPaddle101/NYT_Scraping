from django.db import models

# Create your models here.

class HitData(models.Model):
    title = models.CharField(max_length=100, null=True)  # Assuming a max length of 100 characters for the title
    year = models.IntegerField()
    month = models.IntegerField()
    hits = models.IntegerField()

    def __str__(self):
        return f"{self.title} ({self.year}-{str(self.month).zfill(2)}): {self.hits} hits"

