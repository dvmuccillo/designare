from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import IntegrityError
from designare.utils import get_hash

class Profile(models.Model):
    """A class to extend django user model"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='static/img/accounts',
    )

    def __str__(self):
        return "%s" % self.user.get_full_name()
"""
Listen for when an user is created,
then create a new profile with user = the recently created user
"""
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
"""
Listen for the user.save() action,
then save the profile of that user too
"""
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Invite(models.Model):
    host_user = models.ForeignKey()
    target_name = models.CharField()
    target_email = models.CharField()
    message = models.CharField()
    code = models.CharField()
    send_date = models.??

    def create_invite_code(self,size):
        try:
            self.code = get_hash(self.send_date,size=size)
            self.save()
        except Exception as IntegrityError:
            self.create_invite_code(instance.send_date,size=size+1)

@receiver(post_save, sender=Invite)
def create_invite_code(sender, instance, created, **kwargs):
    if created:
        instance.create_invite_code(size=5)



        
