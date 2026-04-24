from contextlib import asynccontextmanager
from datetime import datetime, UTC
from typing import  Sequence

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel, select
from models import Note, NoteCreate
from database import engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield
    print("Application is shutting down...")


def get_session():
    with Session(engine) as session:
        yield session

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Backend is running"}

@app.get("/notes", status_code=200)
async def get_notes(session: Session = Depends(get_session)) -> Sequence[Note]:
    notes = session.exec(select(Note)).all()
    return notes

@app.get("/notes/{note_id}", response_model=Note)
async def get_note(note_id: int, session: Session = Depends(get_session)):
    note = session.get(Note, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@app.post("/notes")
def create_note(note: NoteCreate, session: Session = Depends(get_session)) -> Note:
    db_note = Note(
        title=note.title,
        content=note.content,
        is_favorite=note.is_favorite,
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC)
    )

    session.add(db_note)
    session.commit()
    session.refresh(db_note)
    return db_note

@app.put("/notes/{note_id}", response_model=Note)
async def update_note(note_id : int, note: NoteCreate, session: Session = Depends(get_session)):
    db_note = session.get(Note, note_id)
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db_note.title = note.title
    db_note.content = note.content
    db_note.is_favorite = note.is_favorite
    db_note.updated_at = datetime.now(UTC)
    session.add(db_note)
    session.commit()
    session.refresh(db_note)
    return db_note



@app.delete("/notes/{note_id}")
def delete_note(note_id: int, session: Session = Depends(get_session)):
    note = session.get(Note, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    session.delete(note)
    session.commit()

    return {"message": "Note deleted successfully"}

