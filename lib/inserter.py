import psycopg2

conn = psycopg2.connect("dbname=diceware user=jkearl")
cur = conn.cursor()

with open('eff-wordlist.txt') as fp:
    all_lines = fp.readlines()
    for i, line in enumerate(all_lines):
        cur.execute("INSERT INTO words (word) VALUES (%s)", (line[6:-1],))

conn.commit()
cur.close()
conn.close()
