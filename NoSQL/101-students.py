#!/usr/bin/env python3
""" Function that returns all students sorted by average score """


def top_students(mongo_collection):
    """
    Returns all students sorted by average score
    The average score must be part of each item with key = averageScore
    """
    pipeline = [
        {
            "$project": {
                "name": "$name",
                "topics": "$topics",
                "averageScore": {"$avg": "$topics.score"}
            }
        },
        {
            "$sort": {"averageScore": -1}
        }
    ]
    return list(mongo_collection.aggregate(pipeline))
