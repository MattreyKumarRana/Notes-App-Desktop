from sqlmodel import Field, SQLModel
from datetime import datetime

class Note(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(nullable=False)
    content: str = Field(nullable=False)
    is_favorite: bool = Field(default=False, nullable=False)
    created_at: datetime
    updated_at: datetime


class NoteCreate(SQLModel):
    title: str = Field(nullable=False)
    content: str = Field(nullable=False)
    is_favorite: bool = Field(default=False, nullable=False)
