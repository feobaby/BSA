# Generated by Django 4.2.10 on 2024-02-29 06:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0002_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("transaction", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transactionmodel",
            name="account",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="account.accountmodel"
            ),
        ),
        migrations.AlterField(
            model_name="transactionmodel",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
