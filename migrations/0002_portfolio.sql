-- Portfolio schema: public site content + admin-managed records.
-- Single-owner site. owner_user_id is claimed by the first signed-in admin.

create table if not exists site_profile (
  id text primary key default 'default',
  name text not null,
  role text not null,
  tagline text not null,
  intro text not null,
  bio text not null,
  location text not null,
  education_summary text not null,
  interests text not null,
  typing_phrases text not null,
  availability_label text not null default 'Available for opportunities',
  availability_detail text not null default 'Open to learning and collaborating.',
  cv_url text,
  profile_image_id text,
  profile_image_url text,
  owner_user_id text,
  updated_at timestamptz not null default now()
);

create table if not exists social_links (
  id serial primary key,
  platform text not null,
  label text not null,
  url text not null,
  sort_order int not null default 0
);

create table if not exists skills (
  id serial primary key,
  name text not null,
  percentage int not null,
  category text not null default 'Programming',
  description text not null default '',
  icon text,
  sort_order int not null default 0
);

create table if not exists projects (
  id serial primary key,
  name text not null,
  description text not null,
  technologies text not null,
  github_url text not null default '',
  live_url text not null default '',
  image_id text,
  image_url text,
  featured boolean not null default true,
  sort_order int not null default 0
);

create table if not exists education (
  id serial primary key,
  title text not null,
  institution text not null,
  period text not null,
  description text not null,
  sort_order int not null default 0
);

create table if not exists media (
  id text primary key,
  mime_type text not null,
  data text not null,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx
  on contact_messages (created_at desc);
