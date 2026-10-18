#School Database Design

# 1. Students Table

The students table stores information about students. It contains
student_id as the primary key, name for the student's full name,
and email for the student's email address. The email column is
unique to prevent two students from registering with the same email.

# 2. Courses Table

The courses table stores information about available courses.
It contains course_id as the primary key, course_name for the
course title, and course_code as a unique identifier for each course.

# 3. Enrolments Table

The enrolments table records which students are enrolled in which
courses. It contains enrolment_id as the primary key, student_id
and course_id as foreign keys, and grade for the student's result.
The combination of student_id and course_id is unique, preventing
a student from enrolling in the same course more than once.

# 4. Relationships

There is a one-to-many relationship between students and enrolments
because one student can have multiple enrolments, while each
enrolment belongs to one student.

There is also a one-to-many relationship between courses and
enrolments because one course can have multiple enrolments, while
each enrolment refers to one course.

Students and courses have a many-to-many relationship because a
student can enrol in several courses and a course can have several
students. The enrolments table acts as a join table connecting
students and courses. It is necessary to represent this relationship
and store additional information, such as each student's grade.

# 5. Index

I would add an index on the course_id column in the enrolments
table. This would help the database find enrolments for a particular
course more efficiently, especially when retrieving all students
taking a course or counting enrolments. The UNIQUE constraint on
(student_id, course_id) also creates an index in SQLite.

# 6. SQL or NoSQL?

I would choose SQL for this school database because the data is
structured and has clear relationships between students, courses,
and enrolments. SQLite supports primary keys, foreign keys, unique
constraints, and JOIN operations, making it suitable for maintaining
data integrity and retrieving related information. SQL also makes
it easy to count students per course, find students without
enrolments, and update grades. Therefore, a relational database
is the most appropriate choice for this system.
