import sqlite3 
from fastapi import Request

def get_cursor(req: Request, return_tuple=False) -> tuple[sqlite3.Connection, sqlite3.Connection.cursor] | None:
    try:
        con:sqlite3.Connection = req.app.state.con
        if not return_tuple:
            con.row_factory = sqlite3.Row # this will make result from execute into dictionary
        cursor = con.cursor()
            
        return (con, cursor)
    except Exception as e:

        print("Something went wrong while getting cursor from sqlite")    
        return None