# Generated by Django 3.2.25 on 2025-05-21 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0010_auto_20250519_1039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='officerating',
            name='rating',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='status_reservation',
            field=models.IntegerField(choices=[(1, 'حجز مؤقت'), (2, 'حجز مؤكد'), (3, 'حجز منتهي الصلاحية'), (4, 'حجز ملغي '), (5, 'حجز وهمي')]),
        ),
    ]
