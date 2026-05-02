#!/usr/bin/env python3
""" Module that returns the list of school having a specific topic """


def schools_by_topic(mongo_collection, topic):
    """ Function that returns the list of school having a specific topic """
    return list(mongo_collection.find({"topics": {"$in": [topic]}}))
