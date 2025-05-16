from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Customer
from .forms import CustomUserCreationForm, CustomUserChangeForm
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ['id', 'username', 'email', 'account_type', 'is_active']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('account_type', 'phone')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('account_type', 'phone')}),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Customer)
