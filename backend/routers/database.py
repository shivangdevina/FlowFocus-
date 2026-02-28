from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from uuid import UUID
import os
from core.database import supabase
from datetime import date, time

'''
create table public.task_db (
  task_id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid null,
  task_name text not null,
  category text null,
  date date null,
  duration_of_task integer null,
  from_time time without time zone null,
  to_time time without time zone null,
  completed boolean null default false,
  constraint task_db_pkey primary key (task_id),
  constraint task_db_user_id_fkey foreign KEY (user_id) references user_profile_db (user_id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_task_db_user_date on public.task_db using btree (user_id, date) TABLESPACE pg_default;

create table public.domain_db (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid null,
  goal_1 jsonb null,
  goal_2_1 jsonb null,
  goal_3_1 jsonb null,
  acads jsonb null,
  date date not null,
  constraint domain_db_pkey primary key (id),
  constraint domain_db_user_id_fkey foreign KEY (user_id) references user_profile_db (user_id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_domain_db_user_date on public.domain_db using btree (user_id, date) TABLESPACE pg_default;
'''

class Task(BaseModel):
    task_id: UUID
    user_id: UUID
    task_name: str
    category: str
    date: date
    duration_of_time: int
    from_time: time 
    to_time: time 
    completed: bool

class Domain(BaseModel):
    id: UUID
    user_id: UUID
    goal_1: dict
    goal_2_1:dict
    goal_3_1: dict
    acads:dict
    date:date

class Constraints(BaseModel):
    id: UUID
    user_id: UUID
    date:date
    constraints:list[str]

router = APIRouter(prefix = "/database",tags=["database"])

@router.get("/tasks/{user_id}/{date}")
async def get_task(user_id:UUID,date:date):
    try: 
        response = (
            supabase.table("task_db")
            .select("task_id","task_name","category","duration_of_task","from_time","to_time","completed")
            .eq("user_id",user_id)
            .eq("date",date)
            .order("from_time")
            .execute()
            )

        return response.data
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    

