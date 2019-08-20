import os
import json
from itertools import filterfalse
from ariadne import QueryType, ObjectType, make_executable_schema, load_schema_from_path
from ariadne.asgi import GraphQL
from aiofile import AIOFile
import aiohttp
from starlette.middleware.cors import CORSMiddleware

from utils import parse_search_results

api_key = os.environ['API_KEY']
search_engine_id = os.environ['SEARCH_ENGINE_ID']
search_url = 'https://www.googleapis.com/customsearch/v1'

data_file_path = os.path.join(os.path.dirname(__file__), 'data.json')

schema = load_schema_from_path(
    os.path.join(os.path.dirname(__file__), 'graphql_types'))

query = QueryType()
country = ObjectType("Country")


@country.field("news")
async def resolve_news(obj, info, aiohttp=aiohttp):
    params = {
        'q': '{0} latest news'.format(obj['name']),
        'key': api_key,
        'cx': search_engine_id
    }
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(search_url, params=params) as resp:
                if resp.status == 200:
                    data = json.loads(await resp.text())
                    return parse_search_results(data)
                else:
                    return []
    except RuntimeError:
        return []


@query.field("continent")
async def resolve_continent(obj, info, continentCode):
    async with AIOFile(data_file_path, 'r') as afp:
        raw_data = await afp.read()
    data = json.loads(raw_data, encoding='utf-8')

    continents = data['data']['continents']
    continent = next(
        filterfalse(lambda x: x['code'] != continentCode, continents), None)

    return continent


@query.field("continents")
async def resolve_continents(obj, info):
    async with AIOFile(data_file_path, 'r') as afp:
        raw_data = await afp.read()
    data = json.loads(raw_data, encoding='utf-8')

    return data['data']['continents']


@query.field("country")
async def resolve_country(obj, info, continentCode, countryCode):
    async with AIOFile(data_file_path, 'r') as afp:
        raw_data = await afp.read()
    data = json.loads(raw_data, encoding='utf-8')

    continents = data['data']['continents']
    continent = next(
        filterfalse(lambda x: x['code'] != continentCode, continents), None)

    if continent is None:
        return None

    countries = continent['countries']
    c = next(filterfalse(lambda x: x['code'] != countryCode, countries), None)

    return c


EXECUTABLE_SCHEMA = make_executable_schema(schema, [query, country])

app = CORSMiddleware(GraphQL(EXECUTABLE_SCHEMA, debug=True),
                     allow_origins=['*'],
                     allow_methods=['*'],
                     allow_headers=['*'])
