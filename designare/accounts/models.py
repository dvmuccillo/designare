from django.db import models, IntegrityError
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import IntegrityError
from designare.utils import get_hash
from django.core.mail import send_mail

class Profile(models.Model):
    """A class to extend django user model"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='static/img/accounts',
    )

    def __str__(self):
        return "%s" % self.user.get_full_name()
    
    def getUserPicture(self):
        if not self.image:
            return 'static/img/accounts/default.jpeg'
        else:
            return self.image

    def getInvites(self):
        return Invite.objects.all().filter(host_user=self.user)
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
    host_user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='invites'
    )
    target_name = models.CharField(max_length=100)
    target_email = models.EmailField(max_length=254)
    message = models.CharField(max_length=255, blank=True)
    code = models.CharField(max_length=30, blank=True)
    creation_date = models.DateTimeField(auto_now=True)
    unsent = models.BooleanField(default=False)

    def __str__(self):
        return "%s" % self.target_email + " - " + self.code

    def create_invite_code(self,size):
        try:
            string = str(self.creation_date)
            self.code = get_hash(string,size=size)
            self.save()
        except IntegrityError:
            self.create_invite_code(self.creation_date,size=size+1)
    
    def send_mail(self):
        subject = self.target_name + ", " + self.host_user.get_full_name() + " convidou você para utilizar o Designare."
        message = "Seu código de acesso é: " + self.code + "<br>" + self.message
        send_mail(
            subject,
            message,
            self.host_user.email,
            [self.target_email],
            fail_silently=False,
        )

@receiver(post_save, sender=Invite)
def generate_invite_code(sender, instance, created, **kwargs):
    if created:
        instance.create_invite_code(size=8)



        
