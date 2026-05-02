#!/usr/bin/env python3
""" Deletion-resilient hypermedia pagination. """
import csv
from typing import List, Dict


class Server:
    """ Server class for resilient pagination. """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {i: dataset[i] for i in range(len(dataset))}
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """ Resilient pagination logic. """
        assert index is not None and 0 <= index < len(self.dataset())
        indexed_data = self.indexed_dataset()
        data = []
        curr = index
        while len(data) < page_size and curr < len(self.dataset()):
            item = indexed_data.get(curr)
            if item:
                data.append(item)
            curr += 1
        return {
            "index": index,
            "next_index": curr,
            "page_size": len(data),
            "data": data
        }
