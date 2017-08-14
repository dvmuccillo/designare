from django.db import models
import json

class Methodology(models.Model):
    
    name = models.CharField(max_length=50)
    is_copy = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name
    
    """
    Generates and returns a copy of the methodology provided
    """
    @classmethod
    def get_copy(Methodology, methodology):
        methodology_copy = Methodology(
            name = methodology.name,
            is_copy = True
        )
        methodology_copy.save()
        """
        Copy all the stages if any
        """
        for stage in methodology.stages.all():
            stage_copy = Stage(
                name = stage.name,
                description = stage.description,
                methodology = methodology_copy,
                order = stage.order
            )
            stage_copy.save()
            """
            Copy all the activities if any
            """
            for activity in stage.activities.all():
                activity_copy = Activity(
                    name = activity.name,
                    description = activity.copy,
                    stage = stage_copy,
                    order = activity.order
                )
                activity_copy.save()
        return methodology_copy

    """
    Generates and returns a string in JSON of the methodology provided
    """
    @classmethod
    def get_json(Methodology, methodology):
        methodology_object = {
            'name' : methodology.name,
            'stages' : []
        }
        for stage in methodology.stages.all():
            stage_object = {
                'name' : stage.name,
                'description' : stage.description,
                'order' : stage.order,
                'activities' : []
            }
            methodology_object['stages'].append(stage_object)
            for activity in stage.activities.all():
                activity_object = {
                    'name' : activity.name,
                    'description' : activity.description,
                    'order' : activity.order
                }
                stage_object['activities'].append(activity_object)
        return json.dumps(methodology_object)

class Stage(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    order = models.IntegerField(null=True)
    methodology = models.ForeignKey(
        Methodology,
        on_delete = models.CASCADE,
        related_name = 'stages'
    )

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name

class Activity(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    order = models.IntegerField(null=True)
    stage = models.ForeignKey(
        Stage,
        on_delete = models.CASCADE,
        related_name = activities
    )

    def __str__(self):
        return self.name 

    def __unicode__(self):
        return self.name
