from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('created_at', 'is_read')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at', 'message')
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email')
        }),
        ('Message', {
            'fields': ('subject', 'message')
        }),
        ('Admin', {
            'fields': ('is_read', 'created_at')
        }),
    )
    
    def mark_as_read(self, request, queryset):
        """Mark selected messages as read"""
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected messages as read"
    
    actions = [mark_as_read]