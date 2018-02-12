from django import forms

from .models import Freelancer

class FreelancerForm(forms.ModelForm):

    class Meta:
        model = Freelancer
        fields = ('first_name', 'last_name', 'bio', 'city', 'state', 'country', 'personal_website_url', 'previous_work_urls',)