import asyncio
from datetime import datetime

from app.core.database import AsyncSessionLocal, init_db
from app.models.chat import Conversation, Message


async def seed_data():
    """Seed the database with initial conversation and message data."""
    await init_db()

    async with AsyncSessionLocal() as session:
        # Create sample conversations
        conversation1 = Conversation(
            title="Project Alpha Due Diligence",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )

        conversation2 = Conversation(
            title="Q4 Portfolio Review",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )

        session.add_all([conversation1, conversation2])
        await session.commit()
        await session.refresh(conversation1)
        await session.refresh(conversation2)

        # Create sample messages for conversation 1
        messages1 = [
            Message(
                conversation_id=conversation1.id,
                type="user",
                content="We are meeting the management team of Project Alpha tomorrow. Draft some key DD questions based on your assessment of these documents.",
                created_at=datetime.utcnow(),
            ),
            Message(
                conversation_id=conversation1.id,
                type="agent",
                content="Based on my analysis of the Project Alpha documents, here are key due diligence questions I recommend:\n\n**Financial Performance:**\n1. What specific factors drove the 15% revenue decline in Q3?\n2. Can you explain the increasing cost structure mentioned in the P&L?\n\n**Market Position:**\n1. How do you plan to address the competitive pressures mentioned in the CIM?\n2. What's your strategy for the growing TAM described in the materials?\n\n**Risk Factors:**\n1. How are you mitigating the operational risks not detailed in the CIM?\n2. What contingency plans exist for the product development challenges identified?",
                created_at=datetime.utcnow(),
            ),
        ]

        # Create sample messages for conversation 2
        messages2 = [
            Message(
                conversation_id=conversation2.id,
                type="user",
                content="Can you summarize the key performance metrics across our portfolio companies?",
                created_at=datetime.utcnow(),
            ),
            Message(
                conversation_id=conversation2.id,
                type="agent",
                content="Here's a summary of key performance metrics across the portfolio:\n\n**Overall Portfolio Health:**\n- 70% of companies meeting or exceeding revenue targets\n- Average revenue growth: 12% YoY\n- 3 companies showing concerning trends\n\n**Top Performers:**\n1. TechCorp: 25% revenue growth, strong market position\n2. HealthStart: 18% growth, expanding into new markets\n\n**Areas of Concern:**\n1. RetailCo: 8% revenue decline, market share loss\n2. ManufacturePlus: Supply chain challenges affecting margins",
                created_at=datetime.utcnow(),
            ),
        ]

        session.add_all(messages1 + messages2)
        await session.commit()

        print("✅ Database seeded successfully!")
        print(f"Created {len([conversation1, conversation2])} conversations")
        print(f"Created {len(messages1 + messages2)} messages")


if __name__ == "__main__":
    asyncio.run(seed_data())
