import os

from django.shortcuts import render, redirect
from django.contrib import messages
from django.conf import settings
from django.core.mail import send_mail

from .forms import ContactForm


# 🟢 MAIN VIEW (handles page + form)
def home(request):
    
    """
    This function:
    1. Shows contact form
    2. Handles form submission
    3. Saves data
    4. Sends email
    """

    # 📌 Case 1: User submitted the form
    if request.method == 'POST':

        # Get form data from request
        form = ContactForm(request.POST)

        # ✅ Check if form is valid
        if form.is_valid():

            # Save form data to database
            contact = form.save()

            # 📧 Try sending email (optional)
            try:
                send_contact_email(
                    name=contact.name,
                    email=contact.email,
                    subject=contact.subject,
                    message=contact.message
                )
            except Exception as e:
                print("Email failed:", e)

            # 🎉 Success message
            messages.success(request, "Your message has been sent successfully!")

            # 🔁 Redirect to avoid duplicate submission
            return redirect('home:home')

        else:
            # ❌ Show form errors
            messages.error(request, "Please fix the errors below.")

    # 📌 Case 2: User opens page (GET request)
    else:
        form = ContactForm()

    # 📤 Send data to HTML template
    context = {
        "page_title": "My Portfolio",
        "form": form
    }

    return render(request, "index.html", context)


# 🟢 HELPER FUNCTION (only for sending email)
def send_contact_email(name, email, subject, message):
    """
    This function sends:
    1. Email to you (site owner)
    2. Confirmation email to user
    """

    # 📩 Email sent to YOU
    owner_subject = f"New Message: {subject}"
    owner_message = f"""
    You received a new message:

    Name: {name}
    Email: {email}
    Subject: {subject}

    Message:
    {message}
    """

    send_mail(
        owner_subject,
        owner_message,
        settings.DEFAULT_FROM_EMAIL,
        [settings.CONTACT_EMAIL],
        fail_silently=True,
    )

    # 📩 Email sent to USER (auto-reply)
    user_subject = "We received your message!"
    user_message = f"""
    Hi {name},

    Thank you for contacting me.
    I will reply to you soon.

    - Your Name
    """

    send_mail(
        user_subject,
        user_message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=True,
    )
