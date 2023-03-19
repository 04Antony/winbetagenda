# Generated by Django 4.1.7 on 2023-03-15 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bet_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('bet_type', models.CharField(max_length=50)),
                ('placed_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]