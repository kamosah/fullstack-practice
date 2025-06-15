#!/usr/bin/env python3
"""
Database setup script for the chat application.
Creates the necessary tables if they don't exist.
"""

import asyncio
import sys
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Import after adding to path
from app.core.database import Base, engine  # noqa: E402


async def create_tables():
    """Create all database tables."""
    print("🗄️  Setting up database tables...")

    try:
        async with engine.begin() as conn:
            # Create all tables
            await conn.run_sync(Base.metadata.create_all)

        print("✅ Database tables created successfully!")
        return True

    except Exception as e:
        print(f"❌ Error creating database tables: {e}")
        return False


async def main():
    """Main setup function."""
    print("Database Setup for Chat Application")
    print("=" * 40)

    success = await create_tables()

    if success:
        print("\n🎉 Database setup complete!")
        print("You can now start the backend server.")
    else:
        print("\n❌ Database setup failed.")
        print("Please check the error messages above.")


if __name__ == "__main__":
    asyncio.run(main())
