def parse_search_results(search_results):
    r = []
    for item in search_results['items']:
        image_url = item['pagemap']['metatags'][0].get('og:image', None)
        if image_url:
            r.append({
                'title':
                item['title'],
                'url':
                item['link'],
                'imageUrl':
                item['pagemap']['metatags'][0].get('og:image', None)
            })
    return r
