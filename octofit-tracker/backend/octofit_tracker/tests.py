from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create(name='Test User', email='test@example.com', team=self.team)
        self.activity = Activity.objects.create(user=self.user, type='Run', duration=10, distance=2.5)
        self.workout = Workout.objects.create(user=self.user, description='Test Workout', duration=30)
        self.leaderboard = Leaderboard.objects.create(user=self.user, points=50)

    def test_user(self):
        self.assertEqual(self.user.name, 'Test User')
        self.assertEqual(self.user.team.name, 'Test Team')

    def test_activity(self):
        self.assertEqual(self.activity.type, 'Run')
        self.assertEqual(self.activity.duration, 10)

    def test_workout(self):
        self.assertEqual(self.workout.description, 'Test Workout')
        self.assertEqual(self.workout.duration, 30)

    def test_leaderboard(self):
        self.assertEqual(self.leaderboard.points, 50)
        self.assertEqual(self.leaderboard.user, self.user)
