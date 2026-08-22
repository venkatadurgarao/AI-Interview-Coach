from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE_URL = os.getenv("NEON_DB_URL")
# config.set_main_option("sqlalchemy.url", DATABASE_URL)
print("============================================================================")
print(DATABASE_URL)
print("============================================================================")

try:
    engine = create_engine(
        url=DATABASE_URL,
        # pool_pre_ping=True,
        # pool_recycle=300,
        # pool_size=5,
        # max_overflow=10,
    )

    SessionLocal = sessionmaker(bind=engine)
except Exception as e:
    print(str(e))
    
class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        print(str(e))
    finally:
        db.close()
    

