# NoSQL - MongoDB Project

This project explores NoSQL databases specifically using **MongoDB 4.4**. It covers basic operations like CRUD (Create, Read, Update, Delete) using both the Mongo Shell and the **PyMongo** Python library.

## Learning Objectives
* Difference between SQL and NoSQL.
* ACID properties and Document storage.
* Using MongoDB to query and manage data.
* Using PyMongo for database interaction in Python scripts.

## Requirements
* All files interpreted on Ubuntu 20.04 LTS.
* Python files follow `pycodestyle` (version 2.5).
* All modules and functions are documented.

## Tasks Overview
| File | Description |
| --- | --- |
| `0-list_databases` | Lists all databases. |
| `1-use_or_create_database` | Creates/uses a specific DB. |
| `8-all.py` | Python function to list all documents. |
| `12-log_stats.py` | Python script for Nginx log statistics. |
| `101-students.py` | Sorting students by average score. |


## Prerequisites & Installation

### 1. Start MongoDB Server
Ensure the MongoDB engine is running. Use the following command to start it manually:
\`\`\`bash
mkdir -p ~/data/db
mongod --dbpath ~/data/db &
\`\`\`

### 2. Set Up Virtual Environment
Activate your environment and install dependencies:
\`\`\`bash
source .venv/bin/activate
pip install pymongo==4.8.0
\`\`\`

---

### 2. Install MongoDB Clients
To run shell scripts (Tasks 0-7), you need the MongoDB client:
\`\`\`bash
sudo apt install -y mongodb-clients
\`\`\`

---

## How to Test the Tasks

### A. MongoDB Shell Scripts (Tasks 0-7)
To run scripts like Task 6, use the following command:
\`\`\`bash
cat 6-update | mongo my_db
\`\`\`

### Task 8: List all documents
\`\`\`bash
python3 -c 'from pymongo import MongoClient; print(__import__("8-all").list_all(MongoClient().my_db.school))'
\`\`\`

### Task 9: Insert a new document
\`\`\`bash
python3 -c 'from pymongo import MongoClient; print(__import__("9-insert_school").insert_school(MongoClient().my_db.school, name="Holberton"))'
\`\`\`

### Task 10: Update topics
\`\`\`bash
python3 -c 'from pymongo import MongoClient; __import__("10-update_topics").update_topics(MongoClient().my_db.school, "Holberton", ["AI", "Python", "NoSQL"])'
\`\`\`

---

## Troubleshooting
- **Connection refused:** Run \`mongod --dbpath ~/data/db &\`.
- **ModuleNotFoundError:** Run \`source .venv/bin/activate\`.
- **Terminal Logs:** Background logs are normal; just press \`Enter\` to continue using the shell.