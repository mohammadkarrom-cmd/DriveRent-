# Generated by Django 5.0.4 on 2025-02-06 00:59

import cars.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id_car', models.AutoField(primary_key=True, serialize=False)),
                ('brand', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('category', models.IntegerField(choices=[(1, 'فاخرة'), (2, 'اقتصادية'), (3, 'منشوف شو لسا في أنواع')])),
                ('is_available_daily', models.BooleanField(default=True)),
                ('is_available_monthly', models.BooleanField(default=False)),
                ('is_available_yearly', models.BooleanField(default=False)),
                ('daily_rent_price', models.FloatField()),
                ('monthly_rent_price', models.FloatField()),
                ('yearly_rent_price', models.FloatField()),
                ('image1', models.ImageField(blank=True, null=True, upload_to=cars.models.PathAndRename('cars'))),
                ('image2', models.ImageField(blank=True, null=True, upload_to=cars.models.PathAndRename('cars'))),
                ('image3', models.ImageField(blank=True, null=True, upload_to=cars.models.PathAndRename('cars'))),
                ('status', models.IntegerField(choices=[(1, 'متاحة'), (2, 'حجز مؤقت'), (3, 'محجوزة')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id_reservation', models.AutoField(primary_key=True, serialize=False)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('type_reservation', models.IntegerField(choices=[(1, 'متاحة'), (2, 'حجز مؤقت'), (3, 'محجوزة')])),
                ('status_reservation', models.IntegerField()),
                ('time_reservation', models.DateTimeField(auto_now_add=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cars.car')),
            ],
        ),
    ]
