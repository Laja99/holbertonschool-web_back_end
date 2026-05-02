#!/usr/bin/env python3
"""
Module for deletion-resilient hypermedia pagination.
This module provides a Server class to paginate a database
of popular baby names while handling deleted data.
"""
import csv
from typing import List, Dict, Optional


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initialize the server with empty datasets."""
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset retrieval from CSV file."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0."""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Retrieves a page of data from the indexed dataset.
        Ensures that if rows are deleted, the user doesn't miss items.
        """
        assert isinstance(index, int) and index >= 0
        assert index < len(self.dataset())

        indexed_data = self.indexed_dataset()
        data = []
        current_index = index

        while len(data) < page_size and current_index < len(self.dataset()):
            item = indexed_data.get(current_index)
            if item:
                data.append(item)
            current_index += 1

        return {
            "index": index,
            "next_index": current_index,
            "page_size": len(data),
            "data": data
        }
