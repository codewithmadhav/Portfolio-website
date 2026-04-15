from django.db import models


class ContactMessage(models.Model):
    """Model to store contact form submissions with full details"""
    
    # Basic Information
    name = models.CharField(max_length=100, db_index=True)
    email = models.EmailField(db_index=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False, db_index=True)
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    read_at = models.DateTimeField(null=True, blank=True)