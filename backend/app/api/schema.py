from typing import List, Optional

import strawberry

from app.models.item import Item as PydanticItem
from app.models.item import ItemCreate as PydanticItemCreate


@strawberry.type
class Item:
    id: int
    name: str
    description: Optional[str]
    price: float

    @classmethod
    def from_pydantic(cls, pydantic_item: PydanticItem) -> "Item":
        return cls(
            id=pydantic_item.id,
            name=pydantic_item.name,
            description=pydantic_item.description,
            price=pydantic_item.price,
        )


@strawberry.input
class ItemCreateInput:
    name: str
    description: Optional[str] = None
    price: float

    def to_pydantic(self) -> PydanticItemCreate:
        return PydanticItemCreate(
            name=self.name, description=self.description, price=self.price
        )


@strawberry.type
class Query:
    @strawberry.field
    async def get_item(self, id: int) -> Item:
        # Mock database operation
        pydantic_item = PydanticItem(
            id=id, name="Example Item", description="Test", price=10.0
        )
        return Item.from_pydantic(pydantic_item)

    @strawberry.field
    async def list_items(self) -> List[Item]:
        pydantic_items = [
            PydanticItem(id=1, name="Item 1", description="Test", price=10.0)
        ]
        return [Item.from_pydantic(item) for item in pydantic_items]


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_item(self, item: ItemCreateInput) -> Item:
        # Mock database operation
        pydantic_item_create = item.to_pydantic()
        pydantic_item = PydanticItem(id=1, **pydantic_item_create.model_dump())
        return Item.from_pydantic(pydantic_item)


schema = strawberry.Schema(query=Query, mutation=Mutation)
