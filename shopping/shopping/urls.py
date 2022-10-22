"""shopping URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from items.views import get_item_by_category, get_stock_inventory, process_order

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/item/<str:item_name>/current-stock', get_stock_inventory),
    path('api/item-category/<str:item_category>/', get_item_by_category),
    path('api/order/', process_order),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
