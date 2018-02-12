from django.db import models
from django.utils import timezone

class Freelancer(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    bio = models.TextField()
    city = models.TextField()
    state = models.TextField()
    country = models.TextField()
    personal_website_url = models.TextField(blank=True, null=True)
    previous_work_urls = models.TextField(blank=True, null=True)
    approved = models.BooleanField(default=False)