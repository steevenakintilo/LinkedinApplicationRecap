from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("GenerateData", views.retrieve_json_and_get_data, name=""),
    path("min_and_max_date_of_application", views.retrieve_min_and_max_application_date, name=""),
]

