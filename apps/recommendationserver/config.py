import os

APP_ENV = os.getenv('APP_ENV', 'development')
DATABASE_USERNAME = os.getenv('DATABASE_USERNAME', 'root')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD', '')
DATABASE_HOST = os.getenv('DATABASE_HOST', 'pg-6bee9d9-chrischimezie24-b4b6.f.aivencloud.com')
DATABASE_PORT = os.getenv('DATABASE_PORT', 13894)
DATABASE_NAME = os.getenv('DATABASE_NAME', 'chrisrecommend')
TMDB_API_KEY = os.getenv('TMDB_API_KEY', '')
# TEST_DATABASE_NAME = os.getenv('DATABASE_NAME', 'test_ecom')