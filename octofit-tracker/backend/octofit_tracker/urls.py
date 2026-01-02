
import os
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from .views import UserViewSet, TeamViewSet, ActivityViewSet, WorkoutViewSet, LeaderboardViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboard', LeaderboardViewSet)


# Custom API root to generate URLs with $CODESPACE_NAME if available
@api_view(['GET'])
def api_root(request, format=None):
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev"
    else:
        # fallback to request.build_absolute_uri('/')
        base_url = request.build_absolute_uri('/')[:-1]  # remove trailing slash
    return Response({
        'users': f"{base_url}/api/users/",
        'teams': f"{base_url}/api/teams/",
        'activities': f"{base_url}/api/activities/",
        'workouts': f"{base_url}/api/workouts/",
        'leaderboard': f"{base_url}/api/leaderboard/",
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
