from fastapi import APIRouter

from app.models.item import Item, ItemCreate

router = APIRouter(prefix="/items", tags=["items"])


@router.post("/", response_model=Item)
async def create_item(item: ItemCreate):
    # Mock database operation
    return Item(id=1, **item.dict())


@router.get("/{item_id}", response_model=Item)
async def read_item(item_id: int):
    return Item(id=item_id, name="Example", price=10.0)
