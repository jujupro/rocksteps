# Generated by Django 4.1.5 on 2023-02-14 04:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_rename_image_photo_rename_image_photo_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
    ]
