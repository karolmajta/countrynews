import unittest

from utils import parse_search_results


class ParseSearchResultsTest(unittest.TestCase):
    def test_filters_out_data_with_missing_images(self):
        data = {
            'items': [{
                'title': 'Hello1',
                'link': 'http://example.com/hello1',
                'pagemap': {
                    'metatags': [{
                        'og:image': 'http://example.com/image.jpeg'
                    }]
                },
            }, {
                'title': 'Hello2',
                'link': 'http://example.com/hello2',
                'pagemap': {
                    'metatags': [{
                        'og:somethingelse': 'blahblah'
                    }]
                },
            }, {
                'title': 'Hello3',
                'link': 'http://example.com/hello3',
                'pagemap': {
                    'metatags': [{
                        'og:image': 'http://example.com/image.png',
                        'og:else': 'blah'
                    }]
                },
            }]
        }

        self.assertEqual(parse_search_results(data), [
            {
                'imageUrl': 'http://example.com/image.jpeg',
                'title': 'Hello1',
                'url': 'http://example.com/hello1'
            },
            {
                'imageUrl': 'http://example.com/image.png',
                'title': 'Hello3',
                'url': 'http://example.com/hello3'
            },
        ])
