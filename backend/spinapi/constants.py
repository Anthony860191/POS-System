# Database constants

DB_HOST = 'csce-315-db.engr.tamu.edu'
DB_NAME = 'csce315_904_41'

# SQL queries
GET_PRICE_QUERY = 'SELECT * FROM get_price_of_pizza({},{},{});'


# Helper functions

def parse_sql_argument(param: str):
    return 'NULL' if param == None or param.strip() == '' else f"'{param}'" 