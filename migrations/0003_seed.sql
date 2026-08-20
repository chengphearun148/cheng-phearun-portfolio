insert into site_profile (
  id, name, role, tagline, intro, bio, location, education_summary, interests,
  typing_phrases, availability_label, availability_detail, profile_image_url
) values (
  'default',
  'Cheng Phearun',
  'Student / Beginner Software Developer',
  'Student & Aspiring Software Developer',
  'I love programming and building things that live on the internet. Currently learning and improving my skills every day.',
  'I am Cheng Phearun, a student in Phnom Penh learning to become a software developer. I started with C to understand how programs really work, then moved into C++ and the first steps of Java. I care about clean structure, honest craft, and shipping small things that actually run. Web development and software engineering are where I am heading — one project, one concept, one late-night compile at a time.',
  'Phnom Penh, Cambodia',
  'Self-taught programming · currently building a software development foundation',
  'Programming, Web Development, Software Development',
  '["C Developer","C++ Developer","Java Beginner","Future Software Engineer"]',
  'Available for opportunities',
  'Open to learning and collaborating.',
  '/profile.jpg'
);

insert into social_links (platform, label, url, sort_order) values
  ('github', 'GitHub', 'https://github.com', 0),
  ('facebook', 'Facebook', 'https://facebook.com', 1),
  ('telegram', 'Telegram', 'https://t.me', 2),
  ('linkedin', 'LinkedIn', 'https://linkedin.com', 3);

insert into skills (name, percentage, category, description, icon, sort_order) values
  ('C', 50, 'Programming', 'Strong foundation in C programming, data structures, and algorithms.', 'c', 0),
  ('C++', 40, 'Programming', 'Object-oriented programming, STL, and problem solving.', 'cpp', 1),
  ('Java', 10, 'Programming', 'Basic knowledge of Java, OOP concepts, and applications.', 'java', 2);

insert into projects (
  name, description, technologies, github_url, live_url, image_url, featured, sort_order
) values
  (
    'C Programming Project',
    'Collection of basic to advanced C programs and mini projects.',
    '["C","CLI"]',
    '',
    '',
    '/projects/c-programming.jpg',
    true,
    0
  ),
  (
    'C++ Student Management System',
    'A desktop application to manage student information using OOP concepts.',
    '["C++","OOP","File I/O"]',
    '',
    '',
    '/projects/cpp-student.jpg',
    true,
    1
  ),
  (
    'Java Application',
    'Simple Java application with core functionalities.',
    '["Java","OOP"]',
    '',
    '',
    '/projects/java-app.jpg',
    true,
    2
  );

insert into education (title, institution, period, description, sort_order) values
  (
    'Software Development Path',
    'Self-directed study',
    '2024 — Present',
    'Building a foundation in programming with C, C++, and Java. Practicing by writing real programs, reading documentation, and turning questions into working code.',
    0
  ),
  (
    'C and Systems Thinking',
    'Independent study',
    '2024',
    'First language. Learned compilation, memory, structured programming, and how software sits on the machine — the base everything else stands on.',
    1
  ),
  (
    'Secondary Education',
    'Phnom Penh, Cambodia',
    'Completed',
    'Academic foundation in Phnom Penh. Curiosity about how software is built led from the classroom into late-night compilers and a developer path.',
    2
  );
