# Generated by Django 3.2.25 on 2025-02-11 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0003_auto_20250207_0238'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='category',
            field=models.IntegerField(choices=[(1, 'فاخرة'), (2, 'اقتصادية'), (3, 'رياضية'), (4, 'شاحنة خفيفة (بيك أب)'), (5, 'كهربائية')]),
        ),
    ]
