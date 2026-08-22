alembic 

Init:
 alembic init alembic

import Base in env.py
"from app.database import Base"

change target_metadata = None to target_metadata = Base.metadata

import all models to env.py "from app.models.filename imoprt ModelName"

add this line to load neon db  "config.set_main_option("sqlalchemy.url", DATABASE_URL)"


run this command to create script
alembic revision --autogenerate -m "first migration" 

run this to create tables in neon db
alembic upgrade head


Note:
Check interview start code with two insert operation seperate or not