# Database Schema Diagram: Launchpad AI Review System (L-AIRS)

Below is a visual representation of the database schema as defined in your Prisma schema. This diagram shows the models, their fields, and the relationships (joins) between them.

```
+----------------+         +-------------------+         +----------------+
|   AdminUser    | 1     * |    Assignment     | 1     * |   Submission   |
+----------------+---------+-------------------+---------+----------------+
| id (PK)        |         | id (PK)           |         | id (PK)        |
| email (unique) |         | title             |         | assignmentId   |
| passwordHash   |         | requirements      |         | code           |
| createdAt      |         | description       |         | feedback       |
|                |         | rubric            |         | rating         |
|                |         | createdAt         |         | createdAt      |
|                |         | updatedAt         |         |                |
+----------------+         | creatorId (FK)    |         |                |
                         | (FK to AdminUser)  |         |                |
                         +-------------------+         +----------------+

Legend:
- PK = Primary Key
- FK = Foreign Key
- 1 = one, * = many

Relationships:
- AdminUser (1) --- (many) Assignment: An admin can create many assignments.
- Assignment (1) --- (many) Submission: An assignment can have many student submissions.
- Assignment.creatorId is a foreign key to AdminUser.id
- Submission.assignmentId is a foreign key to Assignment.id
```

> This diagram is a text-based ERD for quick reference. For a graphical ERD, you can use tools like dbdiagram.io, Prisma's ERD generator, or draw.io and copy the above structure.
