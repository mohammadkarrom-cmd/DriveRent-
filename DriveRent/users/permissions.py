from rest_framework.permissions import BasePermission

class IsRole(BasePermission):
    def __init__(self, allowed_roles=None):
        if allowed_roles is None:
            allowed_roles = []
        self.allowed_roles = allowed_roles

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.account_type in self.allowed_roles
